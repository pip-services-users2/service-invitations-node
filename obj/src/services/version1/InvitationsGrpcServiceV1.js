"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvitationsGrpcServiceV1 = void 0;
const services = require('../../../../src/protos/invitations_v1_grpc_pb');
const messages = require('../../../../src/protos/invitations_v1_pb');
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_grpc_nodex_1 = require("pip-services3-grpc-nodex");
const InvitationsGrpcConverterV1_1 = require("./InvitationsGrpcConverterV1");
class InvitationsGrpcServiceV1 extends pip_services3_grpc_nodex_1.GrpcService {
    constructor() {
        super(services.InvitationsService);
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor("service-invitations", "controller", "default", "*", "*"));
    }
    setReferences(references) {
        super.setReferences(references);
        this._controller = this._dependencyResolver.getOneRequired('controller');
    }
    getInvitations(call) {
        return __awaiter(this, void 0, void 0, function* () {
            let correlationId = call.request.getCorrelationId();
            let filter = new pip_services3_commons_nodex_2.FilterParams();
            InvitationsGrpcConverterV1_1.InvitationsGrpcConverterV1.setMap(filter, call.request.getFilterMap());
            let paging = InvitationsGrpcConverterV1_1.InvitationsGrpcConverterV1.toPagingParams(call.request.getPaging());
            let response = new messages.InvitationPageReply();
            try {
                let result = yield this._controller.getInvitations(correlationId, filter, paging);
                let page = InvitationsGrpcConverterV1_1.InvitationsGrpcConverterV1.fromInvitationPage(result);
                response.setPage(page);
            }
            catch (err) {
                let error = InvitationsGrpcConverterV1_1.InvitationsGrpcConverterV1.fromError(err);
                response.setError(error);
            }
            return response;
        });
    }
    getInvitationById(call) {
        return __awaiter(this, void 0, void 0, function* () {
            let correlationId = call.request.getCorrelationId();
            let invitationId = call.request.getInvitationId();
            let response = new messages.InvitationObjectReply();
            try {
                let result = yield this._controller.getInvitationById(correlationId, invitationId);
                let invitation = InvitationsGrpcConverterV1_1.InvitationsGrpcConverterV1.fromInvitation(result);
                response.setInvitation(invitation);
            }
            catch (err) {
                let error = InvitationsGrpcConverterV1_1.InvitationsGrpcConverterV1.fromError(err);
                response.setError(error);
            }
            return response;
        });
    }
    createInvitation(call) {
        return __awaiter(this, void 0, void 0, function* () {
            let correlationId = call.request.getCorrelationId();
            let invitation = InvitationsGrpcConverterV1_1.InvitationsGrpcConverterV1.toInvitation(call.request.getInvitation());
            let response = new messages.InvitationObjectReply();
            try {
                let result = yield this._controller.createInvitation(correlationId, invitation);
                let invitationGrpcObj = InvitationsGrpcConverterV1_1.InvitationsGrpcConverterV1.fromInvitation(result);
                if (result)
                    response.setInvitation(invitationGrpcObj);
            }
            catch (err) {
                let error = InvitationsGrpcConverterV1_1.InvitationsGrpcConverterV1.fromError(err);
                response.setError(error);
            }
            return response;
        });
    }
    deleteInvitationById(call) {
        return __awaiter(this, void 0, void 0, function* () {
            let correlationId = call.request.getCorrelationId();
            let invitationId = call.request.getInvitationId();
            let response = new messages.InvitationObjectReply();
            try {
                let result = yield this._controller.deleteInvitationById(correlationId, invitationId);
                let invitation = InvitationsGrpcConverterV1_1.InvitationsGrpcConverterV1.fromInvitation(result);
                if (result)
                    response.setInvitation(invitation);
            }
            catch (err) {
                let error = InvitationsGrpcConverterV1_1.InvitationsGrpcConverterV1.fromError(err);
                response.setError(error);
            }
            return response;
        });
    }
    activateInvitations(call) {
        return __awaiter(this, void 0, void 0, function* () {
            let correlationId = call.request.getCorrelationId();
            let email = call.request.getEmail();
            let userId = call.request.getUserId();
            let response = new messages.InvitationObjectReply();
            try {
                let result = yield this._controller.activateInvitations(correlationId, email, userId);
                let invitations = InvitationsGrpcConverterV1_1.InvitationsGrpcConverterV1.fromInvitationList(result);
                if (result)
                    response.setInvitationList(invitations);
            }
            catch (err) {
                let error = InvitationsGrpcConverterV1_1.InvitationsGrpcConverterV1.fromError(err);
                response.setError(error);
            }
            return response;
        });
    }
    approveInvitation(call) {
        return __awaiter(this, void 0, void 0, function* () {
            let correlationId = call.request.getCorrelationId();
            let invitationId = call.request.getInvitationId();
            let role = call.request.getRole();
            let response = new messages.InvitationObjectReply();
            try {
                let result = yield this._controller.approveInvitation(correlationId, invitationId, role);
                let invitation = InvitationsGrpcConverterV1_1.InvitationsGrpcConverterV1.fromInvitation(result);
                if (result)
                    response.setInvitation(invitation);
            }
            catch (err) {
                let error = InvitationsGrpcConverterV1_1.InvitationsGrpcConverterV1.fromError(err);
                response.setError(error);
            }
            return response;
        });
    }
    denyInvitation(call) {
        return __awaiter(this, void 0, void 0, function* () {
            let correlationId = call.request.getCorrelationId();
            let invitationId = call.request.getInvitationId();
            let response = new messages.InvitationObjectReply();
            try {
                let result = yield this._controller.denyInvitation(correlationId, invitationId);
                let invitation = InvitationsGrpcConverterV1_1.InvitationsGrpcConverterV1.fromInvitation(result);
                if (result)
                    response.setInvitation(invitation);
            }
            catch (err) {
                let error = InvitationsGrpcConverterV1_1.InvitationsGrpcConverterV1.fromError(err);
                response.setError(error);
            }
            return response;
        });
    }
    resendInvitation(call) {
        return __awaiter(this, void 0, void 0, function* () {
            let correlationId = call.request.getCorrelationId();
            let invitationId = call.request.getInvitationId();
            let response = new messages.InvitationObjectReply();
            try {
                let result = yield this._controller.resendInvitation(correlationId, invitationId);
                let invitation = InvitationsGrpcConverterV1_1.InvitationsGrpcConverterV1.fromInvitation(result);
                if (result)
                    response.setInvitation(invitation);
            }
            catch (err) {
                let error = InvitationsGrpcConverterV1_1.InvitationsGrpcConverterV1.fromError(err);
                response.setError(error);
            }
            return response;
        });
    }
    notifyInvitation(call) {
        return __awaiter(this, void 0, void 0, function* () {
            let correlationId = call.request.getCorrelationId();
            let invitation = InvitationsGrpcConverterV1_1.InvitationsGrpcConverterV1.toInvitation(call.request.getInvitation());
            let response = new messages.InvitationEmptyReply();
            try {
                yield this._controller.notifyInvitation(correlationId, invitation);
            }
            catch (err) {
                let error = InvitationsGrpcConverterV1_1.InvitationsGrpcConverterV1.fromError(err);
                response.setError(error);
            }
            return response;
        });
    }
    register() {
        this.registerMethod('get_invitations', null, this.getInvitations);
        this.registerMethod('get_invitation_by_id', null, this.getInvitationById);
        this.registerMethod('create_invitation', null, this.createInvitation);
        this.registerMethod('delete_invitation_by_id', null, this.deleteInvitationById);
        this.registerMethod('activate_invitations', null, this.activateInvitations);
        this.registerMethod('approve_invitation', null, this.approveInvitation);
        this.registerMethod('deny_invitation', null, this.denyInvitation);
        this.registerMethod('resend_invitation', null, this.resendInvitation);
        this.registerMethod('notify_invitation', null, this.notifyInvitation);
    }
}
exports.InvitationsGrpcServiceV1 = InvitationsGrpcServiceV1;
//# sourceMappingURL=InvitationsGrpcServiceV1.js.map