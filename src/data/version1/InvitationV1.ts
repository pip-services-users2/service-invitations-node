import { IStringIdentifiable } from 'pip-services3-commons-nodex';

export class InvitationV1 implements IStringIdentifiable {
    public id: string;

    public action: string;
    public org_id?: string;
    public org_name?: string;
    public role?: string;
    public language?: string;

    public create_time?: Date;
    public creator_name?: string;
    public creator_id: string;

    public invitee_name?: string;
    public invitee_email?: string;
    public invitee_id?: string;
    public invitee_about?: string;

    public sent_time?: Date;
    public expire_time?: Date;
}