/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { ViewProps } from "@aws-amplify/ui-react";
export declare type ProjectTagProps = React.PropsWithChildren<Partial<ViewProps> & {
    CompName?: String;
    ProjName?: String;
    PeopleStatus?: String;
    First?: String;
    Second?: String;
    Optional?: String;
} & {
    lock?: "False" | "True";
    memberStatus?: "Less" | "More" | "Regular";
    projStatus?: "IDK" | "Not Prefer" | "Prefer";
} & {
    overrides?: EscapeHatchProps | undefined | null;
}>;
export default function ProjectTag(props: ProjectTagProps): React.ReactElement;
