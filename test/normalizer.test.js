"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../src");
const tc_inc_trainer_json_1 = __importDefault(require("./data/tc_inc_trainer.json"));
const tc_inc_trainer_json_2 = __importDefault(require("./data_normalized/tc_inc_trainer.json"));
const tc_no_inc_json_1 = __importDefault(require("./data/tc_no_inc.json"));
const tc_no_inc_json_2 = __importDefault(require("./data_normalized/tc_no_inc.json"));
const vtr_inc_json_1 = __importDefault(require("./data/vtr_inc.json"));
const tc_inc_materials_json_1 = __importDefault(require("./data/tc_inc_materials.json"));
describe("NORMALIZER", () => {
    it("Should normalize training_class with trainer includes", () => {
        const normalized = (0, src_1.normalizeJAResponse)(tc_inc_trainer_json_1.default);
        expect(normalized).toEqual(tc_inc_trainer_json_2.default);
    });
    it("Should normalize a training_class w/o includes", () => {
        const normalized = (0, src_1.normalizeJAResponse)(tc_no_inc_json_1.default);
        expect(normalized).toEqual(tc_no_inc_json_2.default);
    });
    it("Should normalize a virtualTrainingRoom with all includes", () => {
        const normalized = (0, src_1.normalizeJAResponse)(vtr_inc_json_1.default);
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
        expect(typeof normalized[0].virtual_training_schedule.id === "string").toBe(true);
    });
    it("Should normalize a trainingClass with material includes", () => {
        const normalized = (0, src_1.normalizeJAResponse)(tc_inc_materials_json_1.default);
        if (Array.isArray(normalized)) {
            expect(false).toBeInstanceOf(true);
            return;
        }
        console.log(normalized);
        expect(normalized).toHaveProperty("materials");
    });
});
//# sourceMappingURL=normalizer.test.js.map