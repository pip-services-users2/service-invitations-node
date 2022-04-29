import { IStringIdentifiable } from 'pip-services3-commons-nodex';
export declare class InvitationV1 implements IStringIdentifiable {
    id: string;
    action: string;
    org_id?: string;
    org_name?: string;
    role?: string;
    language?: string;
    create_time?: Date;
    creator_name?: string;
    creator_id: string;
    invitee_name?: string;
    invitee_email?: string;
    invitee_id?: string;
    invitee_about?: string;
    sent_time?: Date;
    expire_time?: Date;
}
