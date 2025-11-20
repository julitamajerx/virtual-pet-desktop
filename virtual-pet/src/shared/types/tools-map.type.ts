import { ToolsNames } from '../enums/tools-name.enum';

type ToolMapType = Record<string, string>;

export const ToolMap: ToolMapType = {
  kitchen: ToolsNames.FOOD,
  bedroom: ToolsNames.LIGHT,
  playroom: ToolsNames.GAME,
};
