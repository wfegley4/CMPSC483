/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { ViewProps } from "@aws-amplify/ui-react";
export declare type PersonProps = React.PropsWithChildren<Partial<ViewProps> & {
    Name?: String;
    Major?: String;
} & {
    status?: "IDK" | "Not Prefer" | "Prefer";
} & {
    overrides?: EscapeHatchProps | undefined | null;
}>;
export default function Person(props: PersonProps): React.ReactElement;
