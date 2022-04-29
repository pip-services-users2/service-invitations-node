"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvitationsGrpcConverterV1 = void 0;
const messages = require('../../../../src/protos/invitations_v1_pb');
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_3 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_4 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_5 = require("pip-services3-commons-nodex");
class InvitationsGrpcConverterV1 {
    static fromError(err) {
        if (err == null)
            return null;
        let description = pip_services3_commons_nodex_4.ErrorDescriptionFactory.create(err);
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
    static toError(obj) {
        if (obj == null || (obj.getCategory() == "" && obj.getMessage() == ""))
            return null;
        let description = {
            type: obj.getType(),
            category: obj.getCategory(),
            code: obj.getCode(),
            correlation_id: obj.getCorrelationId(),
            status: obj.getStatus(),
            message: obj.getMessage(),
            cause: obj.getCause(),
            stack_trace: obj.getStackTrace(),
            details: InvitationsGrpcConverterV1.getMap(obj.getDetailsMap())
        };
        return pip_services3_commons_nodex_5.ApplicationExceptionFactory.create(description);
    }
    static setMap(map, values) {
        if (values == null)
            return;
        if (typeof values.toObject == 'function')
            values = values.toObject();
        if (Array.isArray(values)) {
            for (let entry of values) {
                if (Array.isArray(entry))
                    map[entry[0]] = entry[1];
            }
        }
        else {
            for (let propName in values) {
                if (values.hasOwnProperty(propName))
                    map[propName] = values[propName];
            }
        }
    }
    static getMap(map) {
        let values = {};
        InvitationsGrpcConverterV1.setMap(values, map);
        return values;
    }
    static toJson(value) {
        if (value == null || value == "")
            return null;
        return JSON.stringify(value);
    }
    static fromJson(value) {
        if (value == null || value == "")
            return null;
        return JSON.parse(value);
    }
    static fromPagingParams(paging) {
        if (paging == null)
            return null;
        let obj = new messages.PagingParams();
        obj.setSkip(paging.skip);
        obj.setTake(paging.take);
        obj.setTotal(paging.total);
        return obj;
    }
    static toPagingParams(obj) {
        if (obj == null)
            return null;
        let paging = new pip_services3_commons_nodex_1.PagingParams(obj.getSkip(), obj.getTake(), obj.getTotal());
        return paging;
    }
    static fromInvitation(invitation) {
        if (invitation == null)
            return null;
        let obj = new messages.Invitation();
        obj.setId(invitation.id);
        obj.setAction(invitation.action);
        obj.setOrgId(invitation.org_id);
        obj.setOrgName(invitation.org_name);
        obj.setRole(invitation.role);
        obj.setLanguage(invitation.language);
        obj.setCreateTime(pip_services3_commons_nodex_2.StringConverter.toString(invitation.create_time));
        obj.setCreatorName(invitation.creator_name);
        obj.setCreatorId(invitation.creator_id);
        obj.setInviteeName(invitation.invitee_name);
        obj.setInviteeEmail(invitation.invitee_email);
        obj.setInviteeId(invitation.invitee_id);
        obj.setInviteeAbout(invitation.invitee_about);
        obj.setSentTime(pip_services3_commons_nodex_2.StringConverter.toString(invitation.sent_time));
        obj.setExpireTime(pip_services3_commons_nodex_2.StringConverter.toString(invitation.expire_time));
        return obj;
    }
    static toInvitation(obj) {
        if (obj == null)
            return null;
        let invitation = {
            id: obj.getId(),
            action: obj.getAction(),
            org_id: obj.getOrgId(),
            org_name: obj.getOrgName(),
            role: obj.getRole(),
            language: obj.getLanguage(),
            create_time: pip_services3_commons_nodex_3.DateTimeConverter.toDateTime(obj.getCreateTime()),
            creator_name: obj.getCreatorName(),
            creator_id: obj.getCreatorId(),
            invitee_name: obj.getInviteeName(),
            invitee_email: obj.getInviteeEmail(),
            invitee_id: obj.getInviteeId(),
            invitee_about: obj.getInviteeAbout(),
            sent_time: pip_services3_commons_nodex_3.DateTimeConverter.toDateTime(obj.getSentTime()),
            expire_time: pip_services3_commons_nodex_3.DateTimeConverter.toDateTime(obj.getExpireTime())
        };
        return invitation;
    }
    static fromInvitationPage(page) {
        if (page == null)
            return null;
        let obj = new messages.InvitationPage();
        obj.setTotal(page.total);
        let data = page.data.map(InvitationsGrpcConverterV1.fromInvitation);
        obj.setDataList(data);
        return obj;
    }
    static toInvitationPage(obj) {
        if (obj == null)
            return null;
        let data = obj.getDataList().map(InvitationsGrpcConverterV1.toInvitation);
        let page = {
            total: obj.getTotal(),
            data: data
        };
        return page;
    }
    static fromInvitationList(invitations) {
        if (invitations == null)
            return null;
        return invitations.map(invitation => InvitationsGrpcConverterV1.fromInvitation(invitation));
    }
    static toInvitationList(obj) {
        if (obj == null)
            return null;
        return obj.map(obj => InvitationsGrpcConverterV1.toInvitation(obj));
    }
}
exports.InvitationsGrpcConverterV1 = InvitationsGrpcConverterV1;
//# sourceMappingURL=InvitationsGrpcConverterV1.js.map