import { normalizeJAResponse } from "../src";
import tc_inc_trainer from "./data/tc_inc_trainer.json";
import tc_inc_trainer_norm from "./data_normalized/tc_inc_trainer.json";
import tc_no_inc from "./data/tc_no_inc.json";
import tc_no_inc_norm from "./data_normalized/tc_no_inc.json";
import vtr_inc from "./data/vtr_inc.json";
import tc_inc_materials from "./data/tc_inc_materials.json";

describe("NORMALIZER", () => {
  it("Should normalize training_class with trainer includes", () => {
    const normalized = normalizeJAResponse(tc_inc_trainer);

    expect(normalized).toEqual(tc_inc_trainer_norm);
  });

  it("Should normalize a training_class w/o includes", () => {
    const normalized = normalizeJAResponse(tc_no_inc);

    expect(normalized).toEqual(tc_no_inc_norm);
  });

  it("Should normalize a virtualTrainingRoom with all includes", () => {
    const normalized = normalizeJAResponse(vtr_inc);

    if (!Array.isArray(normalized)) {
      expect(normalized).toBeInstanceOf(Array);
      return;
    }

    expect(normalized).toBeInstanceOf(Array);
    expect(normalized[0]).toHaveProperty("training_class");
    expect(typeof normalized[0].training_class.id === "string").toBe(true);
    expect(normalized[0]).toHaveProperty("trainer");
    expect(typeof normalized[0].trainer.id === "string").toBe(true);
    expect(normalized[0]).toHaveProperty("virtual_training");
    expect(typeof normalized[0].virtual_training.id === "string").toBe(true);
    expect(normalized[0]).toHaveProperty("virtual_training_schedule");
    expect(typeof normalized[0].virtual_training_schedule.id === "string").toBe(
      true
    );
  });

  it("Should normalize a trainingClass with material includes", () => {
    const normalized = normalizeJAResponse(tc_inc_materials);

    if (Array.isArray(normalized)) {
      expect(false).toBeInstanceOf(true);
      return;
    }

    console.log(normalized);

    expect(normalized).toHaveProperty("materials");
  });
});
