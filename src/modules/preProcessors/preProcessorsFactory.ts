import { PreProcessorBase } from "../../types/preProcessorBase";
import { TextNoisePreProcessor } from "./textNoisePreProcessor";

export const PreProcessorsFactory = () => {
    const { lookup } = PreProcessorsFactory;
    const create = (name: string): PreProcessorBase => {
        const preProcesser = lookup.get(name);
        if (!preProcesser) throw new Error(`Cannot find preProcessor name ${name}`);
        return preProcesser;
    };
    const getKeys = (): string[] => Array.from(lookup.keys());
    return { create, getKeys };
};
PreProcessorsFactory.lookup = new Map<string, PreProcessorBase>([
    ["textNoise", TextNoisePreProcessor()],
]);
PreProcessorsFactory.add = (model: PreProcessorBase) =>
    (PreProcessorsFactory.lookup = PreProcessorsFactory.lookup.set(model.name, model));
