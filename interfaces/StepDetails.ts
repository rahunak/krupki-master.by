export interface StepDetails {
    address: string;
    recipient: string;
    phone: string;
    note: string;
}

export interface Step {
    num: string;
    title: string;
    desc: string;
    isExpandable?: boolean;
    details?: StepDetails;
}