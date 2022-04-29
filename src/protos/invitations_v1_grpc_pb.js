// GENERATED CODE -- DO NOT EDIT!

// Original file comments:
// Copyright 2015 gRPC authors.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
'use strict';
var grpc = require('grpc');
var invitations_v1_pb = require('./invitations_v1_pb.js');

function serialize_invitations_v1_InvitationActivateRequest(arg) {
  if (!(arg instanceof invitations_v1_pb.InvitationActivateRequest)) {
    throw new Error('Expected argument of type invitations_v1.InvitationActivateRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_invitations_v1_InvitationActivateRequest(buffer_arg) {
  return invitations_v1_pb.InvitationActivateRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_invitations_v1_InvitationApproveRequest(arg) {
  if (!(arg instanceof invitations_v1_pb.InvitationApproveRequest)) {
    throw new Error('Expected argument of type invitations_v1.InvitationApproveRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_invitations_v1_InvitationApproveRequest(buffer_arg) {
  return invitations_v1_pb.InvitationApproveRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_invitations_v1_InvitationEmptyReply(arg) {
  if (!(arg instanceof invitations_v1_pb.InvitationEmptyReply)) {
    throw new Error('Expected argument of type invitations_v1.InvitationEmptyReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_invitations_v1_InvitationEmptyReply(buffer_arg) {
  return invitations_v1_pb.InvitationEmptyReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_invitations_v1_InvitationIdRequest(arg) {
  if (!(arg instanceof invitations_v1_pb.InvitationIdRequest)) {
    throw new Error('Expected argument of type invitations_v1.InvitationIdRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_invitations_v1_InvitationIdRequest(buffer_arg) {
  return invitations_v1_pb.InvitationIdRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_invitations_v1_InvitationListReply(arg) {
  if (!(arg instanceof invitations_v1_pb.InvitationListReply)) {
    throw new Error('Expected argument of type invitations_v1.InvitationListReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_invitations_v1_InvitationListReply(buffer_arg) {
  return invitations_v1_pb.InvitationListReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_invitations_v1_InvitationObjectReply(arg) {
  if (!(arg instanceof invitations_v1_pb.InvitationObjectReply)) {
    throw new Error('Expected argument of type invitations_v1.InvitationObjectReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_invitations_v1_InvitationObjectReply(buffer_arg) {
  return invitations_v1_pb.InvitationObjectReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_invitations_v1_InvitationObjectRequest(arg) {
  if (!(arg instanceof invitations_v1_pb.InvitationObjectRequest)) {
    throw new Error('Expected argument of type invitations_v1.InvitationObjectRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_invitations_v1_InvitationObjectRequest(buffer_arg) {
  return invitations_v1_pb.InvitationObjectRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_invitations_v1_InvitationPageReply(arg) {
  if (!(arg instanceof invitations_v1_pb.InvitationPageReply)) {
    throw new Error('Expected argument of type invitations_v1.InvitationPageReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_invitations_v1_InvitationPageReply(buffer_arg) {
  return invitations_v1_pb.InvitationPageReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_invitations_v1_InvitationPageRequest(arg) {
  if (!(arg instanceof invitations_v1_pb.InvitationPageRequest)) {
    throw new Error('Expected argument of type invitations_v1.InvitationPageRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_invitations_v1_InvitationPageRequest(buffer_arg) {
  return invitations_v1_pb.InvitationPageRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


// The invitations service definition.
var InvitationsService = exports.InvitationsService = {
  get_invitations: {
    path: '/invitations_v1.Invitations/get_invitations',
    requestStream: false,
    responseStream: false,
    requestType: invitations_v1_pb.InvitationPageRequest,
    responseType: invitations_v1_pb.InvitationPageReply,
    requestSerialize: serialize_invitations_v1_InvitationPageRequest,
    requestDeserialize: deserialize_invitations_v1_InvitationPageRequest,
    responseSerialize: serialize_invitations_v1_InvitationPageReply,
    responseDeserialize: deserialize_invitations_v1_InvitationPageReply,
  },
  get_invitation_by_id: {
    path: '/invitations_v1.Invitations/get_invitation_by_id',
    requestStream: false,
    responseStream: false,
    requestType: invitations_v1_pb.InvitationIdRequest,
    responseType: invitations_v1_pb.InvitationObjectReply,
    requestSerialize: serialize_invitations_v1_InvitationIdRequest,
    requestDeserialize: deserialize_invitations_v1_InvitationIdRequest,
    responseSerialize: serialize_invitations_v1_InvitationObjectReply,
    responseDeserialize: deserialize_invitations_v1_InvitationObjectReply,
  },
  create_invitation: {
    path: '/invitations_v1.Invitations/create_invitation',
    requestStream: false,
    responseStream: false,
    requestType: invitations_v1_pb.InvitationObjectRequest,
    responseType: invitations_v1_pb.InvitationObjectReply,
    requestSerialize: serialize_invitations_v1_InvitationObjectRequest,
    requestDeserialize: deserialize_invitations_v1_InvitationObjectRequest,
    responseSerialize: serialize_invitations_v1_InvitationObjectReply,
    responseDeserialize: deserialize_invitations_v1_InvitationObjectReply,
  },
  delete_invitation_by_id: {
    path: '/invitations_v1.Invitations/delete_invitation_by_id',
    requestStream: false,
    responseStream: false,
    requestType: invitations_v1_pb.InvitationIdRequest,
    responseType: invitations_v1_pb.InvitationObjectReply,
    requestSerialize: serialize_invitations_v1_InvitationIdRequest,
    requestDeserialize: deserialize_invitations_v1_InvitationIdRequest,
    responseSerialize: serialize_invitations_v1_InvitationObjectReply,
    responseDeserialize: deserialize_invitations_v1_InvitationObjectReply,
  },
  activate_invitations: {
    path: '/invitations_v1.Invitations/activate_invitations',
    requestStream: false,
    responseStream: false,
    requestType: invitations_v1_pb.InvitationActivateRequest,
    responseType: invitations_v1_pb.InvitationListReply,
    requestSerialize: serialize_invitations_v1_InvitationActivateRequest,
    requestDeserialize: deserialize_invitations_v1_InvitationActivateRequest,
    responseSerialize: serialize_invitations_v1_InvitationListReply,
    responseDeserialize: deserialize_invitations_v1_InvitationListReply,
  },
  approve_invitation: {
    path: '/invitations_v1.Invitations/approve_invitation',
    requestStream: false,
    responseStream: false,
    requestType: invitations_v1_pb.InvitationApproveRequest,
    responseType: invitations_v1_pb.InvitationObjectReply,
    requestSerialize: serialize_invitations_v1_InvitationApproveRequest,
    requestDeserialize: deserialize_invitations_v1_InvitationApproveRequest,
    responseSerialize: serialize_invitations_v1_InvitationObjectReply,
    responseDeserialize: deserialize_invitations_v1_InvitationObjectReply,
  },
  deny_invitation: {
    path: '/invitations_v1.Invitations/deny_invitation',
    requestStream: false,
    responseStream: false,
    requestType: invitations_v1_pb.InvitationIdRequest,
    responseType: invitations_v1_pb.InvitationObjectReply,
    requestSerialize: serialize_invitations_v1_InvitationIdRequest,
    requestDeserialize: deserialize_invitations_v1_InvitationIdRequest,
    responseSerialize: serialize_invitations_v1_InvitationObjectReply,
    responseDeserialize: deserialize_invitations_v1_InvitationObjectReply,
  },
  resend_invitation: {
    path: '/invitations_v1.Invitations/resend_invitation',
    requestStream: false,
    responseStream: false,
    requestType: invitations_v1_pb.InvitationIdRequest,
    responseType: invitations_v1_pb.InvitationObjectReply,
    requestSerialize: serialize_invitations_v1_InvitationIdRequest,
    requestDeserialize: deserialize_invitations_v1_InvitationIdRequest,
    responseSerialize: serialize_invitations_v1_InvitationObjectReply,
    responseDeserialize: deserialize_invitations_v1_InvitationObjectReply,
  },
  notify_invitation: {
    path: '/invitations_v1.Invitations/notify_invitation',
    requestStream: false,
    responseStream: false,
    requestType: invitations_v1_pb.InvitationObjectRequest,
    responseType: invitations_v1_pb.InvitationEmptyReply,
    requestSerialize: serialize_invitations_v1_InvitationObjectRequest,
    requestDeserialize: deserialize_invitations_v1_InvitationObjectRequest,
    responseSerialize: serialize_invitations_v1_InvitationEmptyReply,
    responseDeserialize: deserialize_invitations_v1_InvitationEmptyReply,
  },
};

exports.InvitationsClient = grpc.makeGenericClientConstructor(InvitationsService);
