import { atom } from "jotai";

// Step state
export const stepAtom = atom(1);

// Custom user text atom (from text-input page)
export const customUserTextAtom = atom("");

// Transcribed text atoms for each part
export const transcribedTextPart1Atom = atom("");
export const transcribedTextPart2Atom = atom("");
export const transcribedTextPart3Atom = atom("");

// Step 2 atoms
export const companyNameAtom = atom("");
export const productNameAtom = atom("");
export const feature1TitleAtom = atom("");
export const feature1DescAtom = atom("");
export const feature2TitleAtom = atom("");
export const feature2DescAtom = atom("");
export const feature3TitleAtom = atom("");
export const feature3DescAtom = atom("");

// Step 4 atoms
export const producerInfoAtom = atom("");
export const motivationAtom = atom("");
export const secretAtom = atom("");

// Step 6 atoms
export const example1Atom = atom("");
export const example2Atom = atom("");
export const example3Atom = atom("");

// Step 7 atoms
export const categoryAtom = atom("");
export const specAtom = atom("");
export const deliveryAtom = atom("");

// Image URL atoms
export const productDetailImagesAtom = atom<string[]>([]);
export const productionSiteImagesAtom = atom<string[]>([]);
export const sellerImagesAtom = atom<string[]>([]);
export const productUsageImagesAtom = atom<string[]>([]);
