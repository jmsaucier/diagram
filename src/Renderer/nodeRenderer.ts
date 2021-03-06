import { Node, DiagramTheme } from "../Models";
import { RoundedRectangle } from "./Draw/RoundedRectangle";
export class NodeRenderer {
  constructor(
    private context: CanvasRenderingContext2D,
    private theme: DiagramTheme
  ) {}

  getNodeFont(size: number, weight = "normal") {
    return `${weight} ${size}px ${
      this.context.font.split(" ")[this.context.font.split(" ").length - 1]
    }`;
  }
  render = ({
    node,
    isHovered,
    isSelected,
    inputActive,
    outputActive
  }: {
    node: Node;
    isHovered?: boolean;
    isSelected?: boolean;
    outputActive?: boolean;
    inputActive?: boolean;
  }) => {
    const {
      colors,
      node: { width, height, nameSize, typeSize, options },
      port
    } = this.theme;
    this.context.fillStyle = colors.node.background;
    if (isSelected || isHovered) {
      this.context.fillStyle = colors.node.selected;
    }
    const leftRadius = node.inputs ? 0 : 5;
    const rightRadius = node.outputs ? 0 : 5;
    RoundedRectangle(this.context, {
      width,
      height,
      x: node.x!,
      y: node.y!,
      radius: 0,
      radiusBottomLeft: leftRadius,
      radiusTopLeft: leftRadius,
      radiusBottomRight: rightRadius,
      radiusTopRight: rightRadius
    });
    this.context.fillStyle =
      colors.node.types[node.definition.type] || colors.node.name;
    this.context.font = this.getNodeFont(typeSize, "normal");
    this.context.textBaseline = "bottom";
    this.context.textAlign = "end";
    this.context.fillText(node.definition.type, node.x! + width, node.y!);
    this.context.font = this.getNodeFont(nameSize, "normal");
    this.context.textAlign = "center";
    this.context.textBaseline = "middle";
    if (node.inputs) {
      this.context.fillStyle = inputActive
        ? colors.port.backgroundActive
        : colors.port.background;
      RoundedRectangle(this.context, {
        height,
        width: port.width,
        x: node.x - port.width,
        y: node.y,
        radiusTopLeft: 5,
        radiusBottomLeft: 5
      });
      this.context.fillStyle = colors.port.button;
      this.context.fillText(
        "+",
        node.x - port.width / 2.0,
        node.y + height / 2.0
      );
      this.context.fillStyle = colors.background;
      port.gap &&
        RoundedRectangle(this.context, {
          height,
          width: port.gap,
          x: node.x,
          y: node.y,
          radius: 0
        });
    }
    if (node.outputs) {
      this.context.fillStyle = outputActive
        ? colors.port.backgroundActive
        : colors.port.background;
      RoundedRectangle(this.context, {
        height,
        width: port.width,
        x: node.x + width,
        y: node.y,
        radiusTopRight: 5,
        radiusBottomRight: 5
      });
      this.context.fillStyle = colors.port.button;
      this.context.fillText(
        "-",
        node.x + width + port.width / 2.0,
        node.y + height / 2.0
      );
      this.context.fillStyle = colors.background;
      port.gap &&
        RoundedRectangle(this.context, {
          height,
          width: port.gap,
          x: node.x + width,
          y: node.y,
          radius: 0
        });
    }
    if (node.options) {
      let xCounter = 0;
      node.options.forEach(o => {
        this.context.fillStyle = colors.node.options[o] || colors.node.name;
        this.context.font = this.getNodeFont(options.fontSize, "normal");
        this.context.textAlign = "left";
        this.context.fillText(
          o,
          node.x + xCounter,
          node.y + height + options.fontSize,
          width
        );
        xCounter += this.context.measureText(o).width + options.fontSize / 2;
      });
    }
    if (node.name) {
      this.context.fillStyle = colors.node.name;
      this.context.font = this.getNodeFont(nameSize, "normal");
      this.context.textAlign = "center";
      this.context.textBaseline = "middle";
      this.context.fillText(
        node.name,
        node.x! + width / 2.0,
        node.y! + height / 2.0
      );
    }
  };
}
