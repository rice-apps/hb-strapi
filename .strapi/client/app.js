/**
 * This file was automatically generated by Strapi.
 * Any modifications made will be discarded.
 */
import ckeditor5 from "@_sh/strapi-plugin-ckeditor/strapi-admin";
import i18N from "@strapi/plugin-i18n/strapi-admin";
import importExportEntries from "../../src/plugins/strapi-plugin-import-export-entries-plugin/strapi-admin";
import { renderAdmin } from "@strapi/strapi/admin";

renderAdmin(document.getElementById("strapi"), {
  plugins: {
    ckeditor5: ckeditor5,
    i18n: i18N,
    "import-export-entries": importExportEntries,
  },
});
