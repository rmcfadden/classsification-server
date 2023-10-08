import { DataSet } from "../../models/dataSet";
import { Model } from "./model";
import { TextFeature } from "../../models/textFeature";
import { ModelsBase } from "./modelsBase";
import { TextModel } from "./textModel";

export const TextModels = () => {
    const train = async ({ items }: DataSet): Promise<Model> =>
        TextModel(items as TextFeature[]) as Model;
    return { train } as ModelsBase;
};
