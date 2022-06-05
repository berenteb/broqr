import React from "react";
import { Button, Grid, GridItem } from "@chakra-ui/react";
import { FaEdit, FaThList } from "react-icons/fa";
import { DeleteButton } from "./DeleteButton";
import { LinkButton } from "./LinkButton";
import { ChildProp } from "../../types/childProp";

type RecordGridProps = {
  colCount: number;
};

type RecordProps = {
  onDelete?: () => void;
  onEdit: () => void;
  entityPageUrl?: string;
} & RecordGridProps;

export const Record: React.FC<RecordProps & ChildProp> = ({
  children,
  entityPageUrl,
  colCount,
  onDelete,
  onEdit,
}) => {
  return (
    <>
      {children}
      <GridItem textAlign="right">
        {entityPageUrl && (
          <LinkButton colorScheme="theme" variant="ghost" url={entityPageUrl}>
            <FaThList />
          </LinkButton>
        )}
        <Button colorScheme="theme" variant="ghost" onClick={onEdit}>
          <FaEdit />
        </Button>
        {onDelete && <DeleteButton onDelete={onDelete} />}
      </GridItem>
      <SeparatorGridItem width={colCount + 1} />
    </>
  );
};

export const RecordGrid: React.FC<RecordGridProps & ChildProp> = ({
  colCount,
  children,
}) => {
  return (
    <Grid
      mt={5}
      templateColumns={`repeat(${colCount}, 1fr) 10rem`}
      gap={5}
      alignItems="center"
      maxW="100%"
      overflow="auto"
    >
      {children}
    </Grid>
  );
};
type SeparatorGridItemProps = {
  width: number;
};
export const SeparatorGridItem: React.FC<SeparatorGridItemProps> = ({
  width,
}) => {
  return (
    <GridItem
      borderBottomStyle="solid"
      borderBottomWidth="1px"
      borderBottomColor="gray.100"
      colStart={1}
      colEnd={width + 1}
      height={0}
    />
  );
};
