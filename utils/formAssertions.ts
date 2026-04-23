import { expect } from '@playwright/test';
import { FormField } from '../types/FormTypes';

export async function verifyRowMatchesForm(rowData: Record<string, string>, searchData: FormField[]) {
    for (const field of searchData) {
      if (!(field.label in rowData)) {
            continue;
        }

        const actualValue = rowData[field.label].trim();
        const expectedValue = field.value.trim();

        // 2. Special handling for Employee Name (Partial Match)
        if (field.label === "Employee Name") {
            // Check if the table value is a 'subset' of what we typed
            // We use trim() and check if one contains the other
            const actualParts = actualValue.split(/\s+/);
            
            const isMatch = actualParts.every(part => expectedValue.includes(part));

            expect(isMatch, 
                `Fuzzy Match Failed: Table shows "${actualValue}", but your data has "${expectedValue}"`
            ).toBeTruthy();
        } 
        else {
            // 3. Strict match for everything else (Username, Status, etc.)
            expect(actualValue, `Verify table column "${field.label}" matches`).toBe(expectedValue);
        }
    }
}