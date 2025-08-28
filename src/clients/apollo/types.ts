import {GraphQLResolveInfo} from "graphql/type";
import {File, TranscriptionJob} from "@prisma/client";
import {Maybe} from "graphql/jsutils/Maybe";

export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    Date: any;
    Time: any;
    DateTime: any;
};

export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
    resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolversParentTypes = {
    Query: {};
    Mutation: {};
    TranscriptionJob: TranscriptionJob;
}

export type ResolversTypes = {
    Int: ResolverTypeWrapper<Scalars['Int']>;
    Date: ResolverTypeWrapper<Scalars['Date']>;
    Time: ResolverTypeWrapper<Scalars['Time']>;
    DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
    String: ResolverTypeWrapper<Scalars['String']>;
    TranscriptionJob: ResolverTypeWrapper<TranscriptionJob>;
    File: ResolverTypeWrapper<File>;
}

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
    transcriptionJob?: Resolver<Maybe<ResolversTypes['TranscriptionJob']>, ParentType, ContextType, RequireFields<TranscriptionJob, 'id'>>;
    transcriptionJobs?: Resolver<Maybe<Array<Maybe<ResolversTypes['TranscriptionJob']>>>, ParentType, ContextType>;
    file?: Resolver<Maybe<ResolversTypes['File']>, ParentType, ContextType, RequireFields<File, 'id'>>;
    files?: Resolver<Maybe<Array<Maybe<ResolversTypes['File']>>>, ParentType, ContextType>;
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
    confirmUpload?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, { fileId: Scalars['Int'] }>;
    createUploadUrl?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, { input: { originalName: string; mimetype: string; bytes?: number } }>;
}

export type Resolvers<ContextType = any> = {
    Query?: QueryResolvers<ContextType>;
    Mutation?: MutationResolvers<ContextType>;
};