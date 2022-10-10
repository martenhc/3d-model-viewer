function getGeneratorFor(templateType = '') {
  return {
    description: `add empty lit ${templateType}`,
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: `What is the name of your ${templateType} (example: 'main-${templateType}')?`,
      },
      {
        type: 'input',
        name: 'properties',
        message: 'Add your properties (comma separated). eg title, color, etc.'
      },
      {
        type: 'input',
        name: 'state',
        message: 'Add your state (comma separated). eg isInitialized, currentImage, etc.'
      },
      {
        type: 'confirm',
        name: 'isAddingLifeCycle',
        message: 'Do you want to add empty lifecycle methods?',
      },
      /* Enable the following prompt if you want to use .sass files */
      // {
      //   type: 'confirm',
      //   default: false,
      //   name: 'isUsingSassStyles',
      //   message: 'Do you want to use a sass file?',
      // },
    ],
    actions: function ({properties, state, isUsingSassStyles}) {
      return [
        {
          type: 'add',
          path: `src/${templateType}/{{dashCase name}}/{{dashCase name}}.ts`,
          templateFile: `plop-templates/${templateType}.ts`,
          skipIfExists: true,
          data: {
            propertyList: generateList(properties),
            stateList: generateList(state),
          },
        },
        getStyles(templateType, isUsingSassStyles),
      ];
    },
  }
}

function getStyles(templateType = '', isUsingSassStyles = false) {
  const fileNamePostfix = isUsingSassStyles ? '' : '-styles';
  const fileExtension = isUsingSassStyles ? 'scss' : 'ts';

  return {
    type: 'add',
    path: `src/${templateType}/{{dashCase name}}/{{dashCase name}}${fileNamePostfix}.${fileExtension}`,
    templateFile: `plop-templates/styles.${fileExtension}`,
    skipIfExists: true,
  };
}

function generateList(inputString = '') {
  return inputString
    ? inputString.split(',').map(value => value.trim())
    : [];
}

module.exports = function (plop) {
  plop.setGenerator('page', getGeneratorFor('page'));

  plop.setGenerator('component', getGeneratorFor('component'));

  plop.setGenerator('state', {
    description: 'add empty state class',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of your class (example: `database`)?',
      },
      {
        type: 'input',
        name: 'state',
        message: 'Define the state (comma-separated). eg: count, volume, ...etc',
      },
    ],
    actions: function({state}) {
      return [
        {
          type: 'add',
          path: 'src/state/{{dashCase name}}.ts',
          templateFile: 'plop-templates/state.ts',
          skipIfExists: true,
          data: {
            stateList: generateList(state),
          },
        },
      ];
    }
  });
};
