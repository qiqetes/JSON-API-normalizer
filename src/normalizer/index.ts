export const normalizeJAResponse = <T extends Normalized|Normalized[]>(
  res: JAResponse
): T => {
  if (!res.data) {
    // @ts-ignore
    return [];
  }
  if (Array.isArray(res.data)) {
    // @ts-ignore
    return res.data.map((data) => {
      return normalizeJAObject(data, res.included);
    });
  }
  return normalizeJAObject(res.data, res.included);
};

const normalizeJAObject = <T extends Normalized>(
  jsonApiItem: Data,
  inclduded: Data[] | undefined,
  alreadyIncluded: string[] = []
): T => {
  if (jsonApiItem.relationships && inclduded?.length) {
    return {
      id: jsonApiItem.id,
      ...getIncludeAttr(jsonApiItem.relationships, inclduded, alreadyIncluded),
      ...jsonApiItem.attributes,
    };
  } else {
    return {
      id: jsonApiItem.id,
      ...jsonApiItem.attributes,
    };
  }
};

// TODO: work in the type of the return attribute with generics and stuff
/**
 * Gets the included attributes from the included array
 * @param relationships: The relationships object from the json api object
 * @param inclduded: the included array
 * @param alreadyIncluded takes care of circular references
 * @returns Object with the included attributes
 */
const getIncludeAttr = (
  relationships: Relationships,
  inclduded: Included[] | null,
  alreadyIncluded: string[] = []
): {} => {
  return Object.entries(relationships).reduce((prev, curr) => {
    const [key, value] = curr;
    if (!value.data) {
      return prev;
    }
    if (Array.isArray(value.data)) {
      return prev;
    } else {
      let { id, type } = value.data;
      const roundRelationships = Object.keys(relationships);

      if (!alreadyIncluded.includes(type) && inclduded) {
        const include = inclduded.find(
          (item) => item.type === type && item.id === id
        );
        if (include) {
          const normalizedInclude = normalizeJAObject(include, inclduded, [
            ...alreadyIncluded,
            ...roundRelationships, // Decide wether to include the current type or the entire round
          ]);

          return {
            ...prev,
            [key]: normalizedInclude,
          };
        }
        return prev;
      }
    }
    return prev;
  }, {});
};
