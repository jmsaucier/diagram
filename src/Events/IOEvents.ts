/**
 * IOEvents:
 *
 * Set of IO-specific events, e.g. mouse button or key was pressed
 * Used by IO service to put events on a bus
 */
export class IOEvents {
  static MouseDrag = "MouseDrag";
  static MouseOverMove = "MouseOverMove";
  static LeftMouseUp = "LeftMouseUp";
  static RightMouseUp = "RightMouseUp";
  static LeftMouseClick = "LeftMouseClick";
  static DoubleClick = "DoubleClick";
  static RightMouseClick = "RightMouseClick";
  static SpacebarPressed = "SpacebarPressed";
  static MPressed = "MPressed";
  static DeletePressed = "Delete";
}
