import { ClassifierBase } from "../../types/classifierBase";
import { DataPointFeatureClassifier } from "./dataPointFeatureClassifier";
import { DataPointClassifier } from "./dataPointClassifier";
import { ImageClassifier } from "./imageClassifier";
import { TextClassifier } from "./textClassifier";
import { NumericalClassifier } from "./numericalClassifier";
import { NDDataPointFeatureClassifier } from "./nDDataPointFeatureClassifier";
export const ClassifiersFactory = () => {
    const classifiersLookup = new Map<string, ClassifierBase>([
        ["text", TextClassifier()],
        ["dataPointFeature", DataPointFeatureClassifier()],
        ["nDDataPointFeature", NDDataPointFeatureClassifier()],
        ["dataPoint", DataPointClassifier()],
        ["numerical", NumericalClassifier()],
        ["image", ImageClassifier()],
    ]);
    const create = (name: string): ClassifierBase => {
        const classifier = classifiersLookup.get(name);
        if (!classifier) throw new Error(`Cannot find classifier name ${name}`);
        return classifier;
    };
    const getKeys = (): string[] => Array.from(classifiersLookup.keys());
    return { create, getKeys };
};
