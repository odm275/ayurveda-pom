import { asNexusMethod /** other imports */ } from "nexus";
import { DateTimeResolver } from "graphql-scalars";

export const DateTime = asNexusMethod(DateTimeResolver, "DateTime");
