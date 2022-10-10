# Localization

We use [Lit Localize](https://lit.dev/docs/localization/overview/) for localization.

Follow the instructions on that page to localize components.

## Configuration

You can find the configuration in the `lit-localize.json` file, located at the root of the project.

There are 2 customizable properties:

1. `sourceLocale`: The default locale.
2. `targetLocales`: A list of all available locales.

```json
{
  ...
  "sourceLocale": "en",
  "targetLocales": ["es-419", "zh-Hans"],
  ...
}
```

Set `VAR_IS_LOCALE_ENABLED` to `true` in the `.env` file to enable localized routes.

## Updating

You need to extract changes in order to update localized text after setting up localization:

### Extracting

Extract new sections marked for localization from the components with the following command: `npm run locale:extract`.

This goes through the entire project to get all the text that needs to be localized, and places it into xlf files. One per locale.

After the extraction process finishes, the text for every locale can be updated in the files located at: `src/data/i18n/locale/{locale}.xlf`.

The contents of the file will look similar to this:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<xliff version="1.2" xmlns="urn:oasis:names:tc:xliff:document:1.2">
<file target-language="es-419" source-language="en" original="lit-localize-inputs" datatype="plaintext">
<body>
<trans-unit id="s3ca5029ac693b7d5">
  <source>HomePage</source>
</trans-unit>
</body>
</file>
</xliff>
```

Add localizations manually by setting a target for each source. For example:

```xml
<target>Página Principal</target>
```

End result:

```xml
<trans-unit id="s3ca5029ac693b7d5">
  <source>HomePage</source>
  <target>Página Principal</target>
</trans-unit>
```

There are also tools available online to update these files.

### Building

After the extraction and updating of the localization texts, the updates are automatically run during the regular build process.

This will generate files that are used to get the right text for each locale set in the `targetLocales` array from the configuration file.
You can find the resulting files in `src/data/i18n/locale/generated`.
Do not make manual changes to them, as they will be overwritten whenever a new build is created.

This scaffold ignores the files inside the `generated` folder by default, so you will not be pushing them to the repository.
