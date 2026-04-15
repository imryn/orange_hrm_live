import { expect } from '@playwright/test';
import { FormField } from '../types/FormTypes';

export async function verifyRowMatchesForm(rowData: Record<string, string>, searchData: FormField[]) {
    for (const field of searchData) {
        expect(rowData[field.label], `Table column "${field.label}" should match`).toBe(field.value);
    }
}