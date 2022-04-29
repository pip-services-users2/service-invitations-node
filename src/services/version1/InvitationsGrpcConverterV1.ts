const messages = require('../../../../src/protos/invitations_v1_pb');

import { DataPage } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { StringConverter } from 'pip-services3-commons-nodex';
import { DateTimeConverter } from 'pip-services3-commons-nodex';
import { ErrorDescriptionFactory } from 'pip-services3-commons-nodex';
import { ErrorDescription } from 'pip-services3-commons-nodex';
import { ApplicationExceptionFactory } from 'pip-services3-commons-nodex';

import { InvitationV1 } from '../../data/version1/InvitationV1';

export class InvitationsGrpcConverterV1 {

    public static fromError(err: any): any {
        if (err == null) return null;

        let description = ErrorDescriptionFactory.create(err);
        let obj = new messages.ErrorDescription();

        obj.setType(description.type);
        obj.setCategory(description.category);
        obj.setCode(description.code);
        obj.setCorrelationId(description.correlation_id);
        obj.setStatus(description.status);
        obj.setMessage(description.message);
        obj.setCause(description.cause);
        obj.setStackTrace(description.stack_trace);
        InvitationsGrpcConverterV1.setMap(obj.getDetailsMap(), description.details);

        return obj;
    }

    public static toError(obj: any): any {
        if (obj == null || (obj.getCategory() == "" && obj.getMessage() == ""))
            return null;

        let description: ErrorDescription = {
            type: obj.getType(),
            category: obj.getCategory(),
            code: obj.getCode(),
            correlation_id: obj.getCorrelationId(),
            status: obj.getStatus(),
            message: obj.getMessage(),
            cause: obj.getCause(),
            stack_trace: obj.getStackTrace(),
            details: InvitationsGrpcConverterV1.getMap(obj.getDetailsMap())
        }
    
        return ApplicationExceptionFactory.create(description);
    }

    public static setMap(map: any, values: any): void {
        if (values == null) return;

        if (typeof values.toObject == 'function')
            values = values.toObject();

        if (Array.isArray(values)) {
            for (let entry of values) {
                if (Array.isArray(entry))
                    map[entry[0]] = entry[1];
            }
        } else {
            for (let propName in values) {
                if (values.hasOwnProperty(propName))
                    map[propName] = values[propName];
            }
        }
    }

    public static getMap(map: any): any {
        let values = {};
        InvitationsGrpcConverterV1.setMap(values, map);
        return values;
    }

    private static toJson(value: any): string {
        if (value == null || value == "") return null;
        return JSON.stringify(value);
    }

    private static fromJson(value: string): any {
        if (value == null || value == "") return null;
        return JSON.parse(value);
    }

    public static fromPagingParams(paging: PagingParams): any {
        if (paging == null) return null;

        let obj = new messages.PagingParams();

        obj.setSkip(paging.skip);
        obj.setTake(paging.take);
        obj.setTotal(paging.total);

        return obj;
    }

    public static toPagingParams(obj: any): PagingParams {
        if (obj == null)
            return null;

        let paging: PagingParams = new PagingParams(
            obj.getSkip(),
            obj.getTake(),
            obj.getTotal()
        );

        return paging;
    }

    public static fromInvitation(invitation: InvitationV1): any {
        if (invitation == null) return null;

        let obj = new messages.Invitation();

        obj.setId(invitation.id);
        obj.setAction(invitation.action);
        obj.setOrgId(invitation.org_id);
        obj.setOrgName(invitation.org_name);
        obj.setRole(invitation.role);
        obj.setLanguage(invitation.language);

        obj.setCreateTime(StringConverter.toString(invitation.create_time))
        obj.setCreatorName(invitation.creator_name);
        obj.setCreatorId(invitation.creator_id);

        obj.setInviteeName(invitation.invitee_name);
        obj.setInviteeEmail(invitation.invitee_email);
        obj.setInviteeId(invitation.invitee_id);
        obj.setInviteeAbout(invitation.invitee_about);
        
        obj.setSentTime(StringConverter.toString(invitation.sent_time))
        obj.setExpireTime(StringConverter.toString(invitation.expire_time))

        return obj;
    }

    public static toInvitation(obj: any): InvitationV1 {
        if (obj == null) return null;

        let invitation: InvitationV1 = {
            id: obj.getId(),
            action: obj.getAction(),
            org_id: obj.getOrgId(),
            org_name: obj.getOrgName(),
            role: obj.getRole(),
            language: obj.getLanguage(),

            create_time: DateTimeConverter.toDateTime(obj.getCreateTime()),            
            creator_name: obj.getCreatorName(),
            creator_id: obj.getCreatorId(),

            invitee_name: obj.getInviteeName(),
            invitee_email: obj.getInviteeEmail(),
            invitee_id: obj.getInviteeId(),
            invitee_about: obj.getInviteeAbout(),

            sent_time: DateTimeConverter.toDateTime(obj.getSentTime()),            
            expire_time: DateTimeConverter.toDateTime(obj.getExpireTime())
        };

        return invitation;
    }

    public static fromInvitationPage(page: DataPage<InvitationV1>): any {
        if (page == null) return null;

        let obj = new messages.InvitationPage();

        obj.setTotal(page.total);
        let data = page.data.map(InvitationsGrpcConverterV1.fromInvitation);
        obj.setDataList(data);

        return obj;
    }

    public static toInvitationPage(obj: any): DataPage<InvitationV1> {
        if (obj == null) return null;

        let data = obj.getDataList().map(InvitationsGrpcConverterV1.toInvitation);
        let page: DataPage<InvitationV1> = {
            total: obj.getTotal(),
            data: data
        };
    
        return page;
    }

    public static fromInvitationList(invitations: InvitationV1[]): any[] {
        if (invitations == null) return null;

        return invitations.map(invitation => InvitationsGrpcConverterV1.fromInvitation(invitation));
    }

    public static toInvitationList(obj: any): InvitationV1[] {
        if (obj == null) return null;

        return obj.map(obj => InvitationsGrpcConverterV1.toInvitation(obj));
    }

}