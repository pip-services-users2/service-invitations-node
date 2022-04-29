import { ILogger } from 'pip-services3-components-nodex';
import { ConfigParams } from 'pip-services3-commons-nodex';

import { MessageV1 } from 'client-msgdistribution-node';
import { RecipientV1 } from 'client-msgdistribution-node';
import { DeliveryMethodV1 } from 'client-msgdistribution-node';
import { MessageResolverV1 } from 'client-msgdistribution-node';
import { IMessageDistributionClientV1 } from 'client-msgdistribution-node';

import { InvitationV1 } from '../data/version1/InvitationV1';

export class MessageConnector {
    public constructor(
        private _logger: ILogger,
        private _messageResolver: MessageResolverV1,
        private _messageDistributionClient: IMessageDistributionClientV1
    ) {
        if (_messageDistributionClient == null)
            this._logger.warn(null, 'Email or Message distribution client was not found. Invitation notifications are disabled');
    }

    public async sendInvitation(correlationId: string, message: MessageV1, invitation: InvitationV1): Promise<void> {
        if (this._messageDistributionClient == null) return;
        if (message == null) return;

        let recipient = <RecipientV1> {
            id: invitation.invitee_id ? invitation.invitee_id : "",
            email: invitation.invitee_email,
            name: invitation.invitee_name,
            language: invitation.language
        };
        let parameters = ConfigParams.fromTuples(
            'invitee_name', invitation.invitee_name,
            'invitee_email', invitation.invitee_email,
            'org_id', invitation.org_id,
            'org_name', invitation.org_name,
            'create_time', invitation.create_time,
            'creator_id', invitation.creator_id,
            'creator_name', invitation.creator_name,
            'expire_time', invitation.expire_time
        );

        try {
            await this._messageDistributionClient.sendMessage(
                correlationId, recipient, message, parameters, DeliveryMethodV1.Email
            );
        } catch(err) {
            this._logger.error(correlationId, err, 'Failed to send message');
        }
    }

    public async sendAccessRequest(correlationId: string, message: MessageV1,
        invitation: InvitationV1, organizationAdminIds: string[]): Promise<void> {
        if (this._messageDistributionClient == null) return;
        if (message == null) return;

        let parameters = ConfigParams.fromTuples(
            'invitee_name', invitation.invitee_name,
            'invitee_email', invitation.invitee_email,
            'org_id', invitation.org_id,
            'org_name', invitation.org_name,
            'create_time', invitation.create_time,
            'creator_id', invitation.creator_id,
            'creator_name', invitation.creator_name,
            'expire_time', invitation.expire_time
        );

        try {
            await this._messageDistributionClient.sendMessageToRecipients(
                correlationId, organizationAdminIds, null, message, parameters, DeliveryMethodV1.All
            );
        } catch (err) {
            this._logger.error(correlationId, err, 'Failed to send message');
        }

        
    }
    
}