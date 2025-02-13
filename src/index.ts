import { z } from "zod";

export const createWebhookSchema = <T>(data: z.ZodType<T>) =>
  z.object({
    data,
    //  Webhook Event Doesn't include event_attributes and timestamp
    // event_attributes: z.object({
    //   http_request: z.object({
    //     client_ip: z.string(),
    //     user_agent: z.string(),
    //   }),
    // }),
    // timestamp: z.number(),
    object: z.literal("event"),
    type: z.string(),
  });

const ResourceJSONSchema = z.object({
  id: z.string(),
  object: z.string(),
});

const IdentificationLinkJSONSchema = ResourceJSONSchema.extend({
  type: z.string(),
});

export const SessionJSONSchema = ResourceJSONSchema.extend({
  abandon_at: z.number(),
  client_id: z.string(),
  created_at: z.number(),
  expire_at: z.number(),
  id: z.string(),
  last_active_at: z.number().nullish(),
  object: z.literal("session"),
  status: z.string(),
  user_id: z.string(),
});

export const DeletedObjectJSONSchema = z.object({
  object: z.string(),
  id: z.string().optional(),
  slug: z.string().optional(),
  deleted: z.boolean(),
});

export const OrganizationJSONSchema = ResourceJSONSchema.extend({
  object: z.literal("organization"),
  name: z.string(),
  slug: z.string(),
  image_url: z.string().nullish(),
  has_image: z.boolean().nullish(),
  members_count: z.number().nullish(),
  pending_invitations_count: z.number().nullish(),
  max_allowed_memberships: z.number().optional(),
  admin_delete_enabled: z.boolean().optional(),
  public_metadata: z.unknown().nullish(),
  private_metadata: z.unknown().nullish(),
  created_by: z.string().nullish(),
  created_at: z.number(),
  updated_at: z.number(),
});

export const OrganizationInvitationJSONSchema = z.object({
  created_at: z.number(),
  email_address: z.string().email(),
  id: z.string(),
  object: z.literal("organization_invitation"),
  organization_id: z.string(),
  role: z.string(),
  status: z.string(),
  updated_at: z.number(),
});

export const WaitlistEntryJSONSchema = z.object({
  created_at: z.number(),
  email_address: z.string().email(),
  id: z.string(),
  invitation: z.unknown().nullish(),
  object: z.literal("waitlist_entry"),
  status: z.string(),
  updated_at: z.number(),
});

const OrganizationMembershipPublicUserDataJSONSchema = z.object({
  identifier: z.string(),
  first_name: z.string().nullish(),
  last_name: z.string().nullish(),
  image_url: z.string().nullish(),
  user_id: z.string(),
});

export const PermissionJSONSchema = ResourceJSONSchema.extend({
  description: z.string(),
  key: z.string(),
  name: z.string(),
  object: z.literal("permission"),
  type: z.string(),
  updated_at: z.number(),
});

export const RoleJSONSchema = ResourceJSONSchema.extend({
  object: z.literal("role"),
  created_at: z.number(),
  description: z.string(),
  id: z.string(),
  is_creator_eligible: z.boolean(),
  key: z.string(),
  name: z.string(),
  permissions: z.array(PermissionJSONSchema),
  updated_at: z.number(),
});

export const OrganizationMembershipJSONSchema = ResourceJSONSchema.extend({
  object: z.literal("organization_membership"),
  public_metadata: z.unknown().nullish(),
  private_metadata: z.unknown().nullish(),
  role: z.string(),
  permissions: z.array(z.string()).nullish(),
  created_at: z.number(),
  updated_at: z.number(),
  organization: OrganizationJSONSchema,
  public_user_data: OrganizationMembershipPublicUserDataJSONSchema,
});

const VerificationJSONSchema = z.object({
  status: z.string(),
  strategy: z.string(),
  attempts: z.number().nullish(),
  expire_at: z.number().nullish(),
  verified_at_client: z.string().nullish(),
  external_verification_redirect_url: z.string().nullish(),
  nonce: z.string().nullish(),
  message: z.string().nullish(),
});

export const ExternalAccountJSONSchema = ResourceJSONSchema.extend({
  object: z.literal("external_account"),
  provider: z.string(),
  identification_id: z.string(),
  provider_user_id: z.string(),
  approved_scopes: z.string(),
  email_address: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  image_url: z.string().optional(),
  username: z.string().nullable(),
  public_metadata: z.unknown().nullish(),
  label: z.string().nullable(),
  verification: VerificationJSONSchema.nullable(),
});

const PhoneNumberJSONSchema = ResourceJSONSchema.extend({
  object: z.literal("phone_number"),
  phone_number: z.string(),
  reserved_for_second_factor: z.boolean(),
  default_second_factor: z.boolean(),
  reserved: z.boolean(),
  verification: VerificationJSONSchema.nullable(),
  linked_to: z.array(IdentificationLinkJSONSchema),
  backup_codes: z.array(z.string()),
});

const EmailAddressJSONSchema = ResourceJSONSchema.extend({
  email_address: z.string().email(),
  object: z.literal("email_address"),
  verification: VerificationJSONSchema.nullable(),
  linked_to: z.array(IdentificationLinkJSONSchema),
});

export const UserJSONSchema = ResourceJSONSchema.extend({
  backup_code_enabled: z.boolean().nullish(),
  banned: z.boolean().nullish(),
  birthday: z.string().nullish(),
  create_organization_enabled: z.boolean().nullish(),
  create_organizations_limit: z.number().nullish(),
  created_at: z.number(),
  delete_self_enabled: z.boolean().nullish(),
  email_addresses: z.array(EmailAddressJSONSchema),
  external_accounts: z.array(ExternalAccountJSONSchema),
  external_id: z.string().nullable(),
  first_name: z.string().nullable(),
  has_image: z.boolean().nullish(),
  image_url: z.string(),
  last_active_at: z.number().nullish(),
  last_name: z.string().nullable(),
  last_sign_in_at: z.number().nullish(),
  legal_accepted_at: z.number().nullish(),
  locked: z.boolean().nullish(),
  lockout_expires_in_seconds: z.number().nullish(),
  object: z.literal("user"),
  organization_memberships: z.array(OrganizationMembershipJSONSchema).nullish(),
  password_enabled: z.boolean(),
  password_last_updated_at: z.number().nullish(),
  phone_numbers: z.array(PhoneNumberJSONSchema),
  primary_email_address_id: z.string().nullish(),
  primary_phone_number_id: z.string().nullish(),
  primary_web3_wallet_id: z.string().nullish(),
  private_metadata: z.unknown(),
  public_metadata: z.unknown(),
  saml_accounts: z.array(z.unknown()).nullish(),
  totp_enabled: z.boolean().nullish(),
  two_factor_enabled: z.boolean().nullish(),
  unsafe_metadata: z.unknown(),
  updated_at: z.number(),
  username: z.string().nullable(),
  verification_attempts_remaining: z.number().nullish(),
  web3_wallets: z.array(z.unknown()).nullish(),
});
