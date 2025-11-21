export type NormalizeMapType = Record<string, string>;

export const normalizeMap: NormalizeMapType = {
    // VS Code
    'code': 'code',
    'code.exe': 'code',
    'code-oss': 'code',
    'code-insiders': 'code',
    'code helper': 'code',

    // Visual Studio
    'devenv.exe': 'visual-studio',

    // Spotify
    /*'spotify': 'spotify',
    'spotify.exe': 'spotify',*/

    // Blender
    'blender': 'blender',
    'blender.exe': 'blender',
    'blender-launcher.exe': 'blender'

    // Steam
    /*'steam': 'steam',
    'steam.exe': 'steam',
    'steamwebhelper': 'steam',
    'steam_osx': 'steam',*/
  };
