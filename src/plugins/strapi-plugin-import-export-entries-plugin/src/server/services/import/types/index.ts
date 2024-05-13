import { SchemaUID } from '../../../types';

export { FileEntry, FileId, FileEntryDynamicZone };

type FileId = string;
type FileEntry = {
  [attribute: string]: string | number | string[] | number[] | FileEntryDynamicZone[] | null;
};
type FileEntryDynamicZone = {
  __component: SchemaUID;
  id: number;
};
