export interface leavemodel {
    id: number;
    empid?: string;
    type: 'full' | 'half';
    fromdate: string;
    todate: string;
    reason: string;
    status: 'approved' | 'cancelled';
}

export interface LeaveDetailsResponse {
    leavedetails: leavemodel[];
}