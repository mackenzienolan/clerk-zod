import { z } from "zod";

export const CreateClerkWebhookSchema = (data: z.AnyZodObject) =>
  z.object({
    data,
    // Clerk Webhook Event Doesn't include event_attributes and timestamp
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

const ClerkResourceJSONSchema = z.object({
  id: z.string(),
  object: z.string(),
});

const ClerkIdentificationLinkJSONSchema = ClerkResourceJSONSchema.extend({
  type: z.string(),
});

export const ClerkOrganizationJSONSchema = ClerkResourceJSONSchema.extend({
  object: z.literal("organization"),
  name: z.string(),
  slug: z.string(),
  image_url: z.string().optional(),
  has_image: z.boolean(),
  members_count: z.number().optional(),
  pending_invitations_count: z.number().optional(),
  max_allowed_memberships: z.number(),
  admin_delete_enabled: z.boolean(),
  public_metadata: z.unknown().nullish(),
  private_metadata: z.unknown().optional(),
  created_by: z.string().optional(),
  created_at: z.number(),
  updated_at: z.number(),
});

const ClerkOrganizationMembershipPublicUserDataJSONSchema = z.object({
  identifier: z.string(),
  first_name: z.string().nullable(),
  last_name: z.string().nullable(),
  image_url: z.string(),
  user_id: z.string(),
});

export const ClerkPermissionJSONSchema = ClerkResourceJSONSchema.extend({
  description: z.string(),
  key: z.string(),
  name: z.string(),
  object: z.literal("permission"),
  type: z.string(),
  updated_at: z.number(),
});

export const ClerkRoleJSONSchema = ClerkResourceJSONSchema.extend({
  object: z.literal("role"),
  created_at: z.number(),
  description: z.string(),
  id: z.string(),
  is_creator_eligible: z.boolean(),
  key: z.string(),
  name: z.string(),
  permissions: z.array(ClerkPermissionJSONSchema),
  updated_at: z.number(),
});

export const ClerkOrganizationMembershipJSONSchema =
  ClerkResourceJSONSchema.extend({
    object: z.literal("organization_membership"),
    public_metadata: z.unknown(),
    private_metadata: z.unknown().optional(),
    role: z.string(),
    permissions: z.array(z.string()),
    created_at: z.number(),
    updated_at: z.number(),
    organization: ClerkOrganizationJSONSchema,
    public_user_data: ClerkOrganizationMembershipPublicUserDataJSONSchema,
  });

const ClerkVerificationJSONSchema = z.object({
  status: z.string(),
  strategy: z.string(),
  attempts: z.number().nullable(),
  expire_at: z.number().nullable(),
  verified_at_client: z.string().optional(),
  external_verification_redirect_url: z.string().nullish(),
  nonce: z.string().nullish(),
  message: z.string().nullish(),
});

export const ClerkExternalAccountJSONSchema = ClerkResourceJSONSchema.extend({
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
  verification: ClerkVerificationJSONSchema.nullable(),
});

const ClerkPhoneNumberJSONSchema = ClerkResourceJSONSchema.extend({
  object: z.literal("phone_number"),
  phone_number: z.string(),
  reserved_for_second_factor: z.boolean(),
  default_second_factor: z.boolean(),
  reserved: z.boolean(),
  verification: ClerkVerificationJSONSchema.nullable(),
  linked_to: z.array(ClerkIdentificationLinkJSONSchema),
  backup_codes: z.array(z.string()),
});

const ClerkEmailAddressJSONSchema = ClerkResourceJSONSchema.extend({
  email_address: z.string().email(),
  object: z.literal("email_address"),
  verification: ClerkVerificationJSONSchema.nullable(),
  linked_to: z.array(ClerkIdentificationLinkJSONSchema),
});

const ClerkUserOrganizationMembershipJSONSchema =
  ClerkResourceJSONSchema.extend({
    object: z.literal("organization_membership"),
    public_metadata: z.unknown(),
    private_metadata: z.unknown().optional(),
    role: z.string(),
    permissions: z.array(z.string()),
    created_at: z.number(),
    updated_at: z.number(),
    organization: ClerkOrganizationJSONSchema,
    public_user_data: ClerkOrganizationMembershipPublicUserDataJSONSchema,
  });

export const ClerkUserJSONSchema = ClerkResourceJSONSchema.extend({
  backup_code_enabled: z.boolean().nullish(),
  banned: z.boolean().nullish(),
  birthday: z.string().nullish(),
  create_organization_enabled: z.boolean(),
  create_organizations_limit: z.number().nullish(),
  created_at: z.number(),
  delete_self_enabled: z.boolean(),
  email_addresses: z.array(ClerkEmailAddressJSONSchema),
  external_accounts: z.array(ClerkExternalAccountJSONSchema),
  external_id: z.string().nullable(),
  first_name: z.string().nullable(),
  has_image: z.boolean().nullish(),
  image_url: z.string(),
  last_active_at: z.number().nullish(),
  last_name: z.string().nullable(),
  last_sign_in_at: z.number().nullish(),
  legal_accepted_at: z.number().nullish(),
  locked: z.boolean(),
  lockout_expires_in_seconds: z.number().nullish(),
  object: z.literal("user"),
  organization_memberships: z
    .array(ClerkUserOrganizationMembershipJSONSchema)
    .nullish(),
  password_enabled: z.boolean(),
  password_last_updated_at: z.number().nullish(),
  phone_numbers: z.array(ClerkPhoneNumberJSONSchema),
  primary_email_address_id: z.string().nullish(),
  primary_phone_number_id: z.string().nullish(),
  primary_web3_wallet_id: z.string().nullish(),
  private_metadata: z.unknown(),
  public_metadata: z.unknown(),
  saml_accounts: z.array(z.unknown()),
  totp_enabled: z.boolean(),
  two_factor_enabled: z.boolean(),
  unsafe_metadata: z.unknown(),
  updated_at: z.number(),
  username: z.string().nullable(),
  verification_attempts_remaining: z.number().nullish(),
  web3_wallets: z.array(z.unknown()),
});
// export const ClerkUserJSONSchema = ClerkResourceJSONSchema.extend({
//   birthday: z.string().nullish(),
//   created_at: z.number(),
//   email_addresses: z.array(ClerkEmailAddressJSONSchema),
//   external_accounts: z.array(ClerkExternalAccountJSONSchema),
//   external_id: z.string().nullable(),
//   first_name: z.string().nullable(),
//   object: z.literal("user"),

//   username: z.string().nullable(),

//   last_name: z.string().nullable(),
//   image_url: z.string(),
//   has_image: z.boolean().nullish(),

//   primary_email_address_id: z.string().nullable(),
//   primary_phone_number_id: z.string().nullable(),
//   primary_web3_wallet_id: z.string().nullable(),
//   password_enabled: z.boolean(),
//   two_factor_enabled: z.boolean(),
//   totp_enabled: z.boolean(),
//   backup_code_enabled: z.boolean(),

//   phone_numbers: z.array(ClerkPhoneNumberJSONSchema),
//   web3_wallets: z.array(z.unknown()),
//   organization_memberships: z
//     .array(ClerkUserOrganizationMembershipJSONSchema)
//     .nullish(),

//   saml_accounts: z.array(z.unknown()),
//   password_last_updated_at: z.number().nullish(),
//   public_metadata: z.unknown(),
//   private_metadata: z.unknown(),
//   unsafe_metadata: z.unknown(),

//   last_sign_in_at: z.number().nullable(),
//   banned: z.boolean(),
//   locked: z.boolean(),
//   lockout_expires_in_seconds: z.number().nullable(),
//   verification_attempts_remaining: z.number().nullable(),

//   updated_at: z.number(),
//   last_active_at: z.number().nullable(),
//   create_organization_enabled: z.boolean(),
//   create_organizations_limit: z.number().nullish(),
//   delete_self_enabled: z.boolean(),
//   legal_accepted_at: z.number().nullable(),
// });
