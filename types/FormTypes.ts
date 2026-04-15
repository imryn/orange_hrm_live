export interface FormField {
    label: string;
    value: string;
    type?: 'input' | 'autocomplete' | 'dropdown';
    // Optional: allow passing a custom selector if the default doesn't work for a specific page
    customInputSelector?: string; 
}
