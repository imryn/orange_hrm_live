import { Locator, Page } from "@playwright/test";
import { BasePage } from "../pages/basePage";

export class TableComponent extends BasePage {

    private readonly tbodyRows: Locator;
    private readonly tableCell: string;
    private TABLE_ROW_SELECTOR: string = ".oxd-table-row";
    private readonly tbodyContainer: Locator;
    private readonly headerCells: Locator;
    private readonly tableResultContainer: Locator;

    // Selectors based on your screenshot
    constructor(page: Page) {
        super(page);
        this.tbodyContainer = page.locator('.oxd-table-body');
        this.tableCell = '.oxd-table-cell';
        this.headerCells = page.locator('.oxd-table-header .oxd-table-header-cell');
        this.tableResultContainer = page.locator(this.tableContainer)
        this.tbodyRows = this.tbodyContainer.locator(this.TABLE_ROW_SELECTOR);
    }

    async getResultCount(): Promise<number> {
        // We subtract 1 if the header is also an 'oxd-table-row'
        // Or better, target only rows inside the table body

        if (!(await this.tbodyContainer.isVisible())) {
            return 0;
        }

        const hasChildren = await this.tbodyContainer.evaluate(node => node.children.length > 0);

        if (!hasChildren) {
            return 0;
        }

        return await this.tbodyRows.count();
    }

    async getRowData(rowIndex: number = 0): Promise<Record<string, string>> {
        // 1. Get all header names first
        const headerCount = await this.headerCells.count();
        const headers: string[] = [];

        for (let i = 0; i < headerCount; i++) {
            const text = await this.headerCells.nth(i).innerText();
            // Clean up text: 
            // 1. Remove sorting arrows (like ↕)
            // 2. Trim whitespace
            const cleanKey = text.replace(/[^a-zA-Z0-9 ]/g, "").trim();
            headers.push(cleanKey);
        }

        // 2. Get the specific row and its cells
        const row = this.tbodyRows.nth(rowIndex);
        const cells = row.locator(this.tableCell);
        const rowData: Record<string, string> = {};

        // 3. Map cell values to header keys
        for (let i = 0; i < headers.length; i++) {
            // We check if the cell exists to avoid index out of bounds
            if (i < await cells.count()) {
                const cellValue = await cells.nth(i).innerText();
                rowData[headers[i]] = cellValue.trim();
            }
        }

        return rowData;
    }

    async verifyRecordsMessage(RecordSearchText: string) {
        // Target the specific span shown in your screenshot
        const RecordsMessage = this.tableResultContainer
            .locator(this.spanElement)
            .filter({ hasText: RecordSearchText });

        // Use a web-first assertion to handle the search delay
        return RecordsMessage
    
    }

}
