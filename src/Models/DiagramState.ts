import { Node } from "./Node";
import { Category } from "./Category";
import { Link } from "./Link";
import { ScreenPosition } from "../IO/ScreenPosition";
import { NodeDefinition } from "./NodeDefinition";

export interface DiagramState {
  links: Link[];
  nodes: Node[];
  categories: Category[];
  nodeDefinitions: NodeDefinition[];
  selectedLinks: Link[];
  selectedNodes: Node[];
  draw?: {
    node: Node;
    io: "i" | "o";
  };
  hover: {
    node?: Node;
    link?: Link;
    menu?: {
      index: number;
    };
    io?: "i" | "o";
    description?: Node;
  };
  menu?: {
    position: ScreenPosition;
  };
  drawedConnection?: ScreenPosition;
  lastPosition: ScreenPosition;
}