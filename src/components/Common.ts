import { ObjectId } from "bson";

export interface DroppedColor {
    fillColor: string
}

export interface ThemeFile {
    accent: string,
    bg: string,
    fg: string,
    ui: string,
    string: string, // lol
    func: string,
    operator: string,
    comment: string,
    error: string,
}

export interface DroppedPreset{
    ThemeFile: ThemeFile;
}

export interface Preset{
    _id: ObjectId;
    name: string;
    description: string;
    ThemeFile: ThemeFile;
    upvotes: number;
}