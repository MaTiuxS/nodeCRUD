const common = [
    'features/**/*.feature',               // Archivos de características (features)
    '--import features/step_definitions/*.js', // Definiciones de pasos
    // '--require features/support/*.js',
    '--format progress'     // Archivos de soporte
].join(' ');

module.exports = {
  default: common
};