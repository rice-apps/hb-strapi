import { prefixPluginTranslations } from "@strapi/helper-plugin";
import {
  Button,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalLayout,
  Portal,
  Textarea,
} from "@strapi/design-system";

import pluginPkg from "../../package.json";
import pluginId from "./pluginId";
import Initializer from "./components/Initializer";
import { useCMEditViewDataManager } from "@strapi/helper-plugin";
import { useSlug } from "./hooks/useSlug";
import { useState } from "react";
import { api } from "./api";
import { CheckPermissions } from "@strapi/helper-plugin";
import { pluginPermissions } from "./permissions";

const name = pluginPkg.strapi.name;

export default {
  register(app: any) {
    const plugin = {
      id: pluginId,
      initializer: Initializer,
      isReady: false,
      name,
    };

    app.registerPlugin(plugin);
  },

  bootstrap(app: any) {
    app.injectContentManagerComponent("listView", "actions", {
      name: "twilio-send-all",
      Component: () => {
        const slug = useSlug();
        const [open, setOpen] = useState(false);
        const [content, setContent] = useState("");

        if (slug && slug == "api::userform.userform") {
          return (
            <CheckPermissions permissions={pluginPermissions.smsButton}>
              <Button variant="tertiary" onClick={() => setOpen(true)}>
                {"Send SMS"}
              </Button>
              {open ? (
                <Portal>
                  <ModalLayout
                    onClose={() => setOpen(false)}
                    labelledBy="title"
                  >
                    <ModalHeader>Send message to all users</ModalHeader>
                    <ModalBody className="plugin-ie-export_modal_body">
                      <Textarea
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Message content"
                        label="Message"
                      >
                        {content}
                      </Textarea>
                    </ModalBody>
                    <ModalFooter
                      startActions={
                        <>
                          <Button
                            variant="danger"
                            onClick={() => {
                              setOpen(false);
                              setContent("");
                            }}
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="tertiary"
                            onClick={() => {
                              setOpen(false);
                            }}
                          >
                            Save
                          </Button>
                        </>
                      }
                      endActions={
                        <Button
                          onClick={async () => {
                            setOpen(false);
                            await api.sendMessage({ messageContent: content });
                            setContent("");
                          }}
                        >
                          Send
                        </Button>
                      }
                    />
                  </ModalLayout>
                </Portal>
              ) : (
                <></>
              )}
            </CheckPermissions>
          );
        } else if (slug && slug == "api::vendor.vendor") {
          return (
            <CheckPermissions permissions={pluginPermissions.signButton}>
              <Button variant="tertiary" onClick={() => setOpen(true)}>
                {"Send Sign-up links"}
              </Button>
              {open ? (
                <Portal>
                  <ModalLayout
                    onClose={() => setOpen(false)}
                    labelledBy="title"
                  >
                    <ModalHeader>Send message to all users</ModalHeader>
                    <ModalBody className="plugin-ie-export_modal_body">
                      This will send a sign-up link to all merchants who have
                      not yet signed up. Are you sure you want to do this?
                    </ModalBody>
                    <ModalFooter
                      startActions={
                        <>
                          <Button
                            variant="danger"
                            onClick={() => {
                              setOpen(false);
                              setContent("");
                            }}
                          >
                            Cancel
                          </Button>
                        </>
                      }
                      endActions={
                        <Button
                          onClick={async () => {
                            setOpen(false);
                            await api.sendNotification();
                          }}
                        >
                          Send
                        </Button>
                      }
                    />
                  </ModalLayout>
                </Portal>
              ) : (
                <></>
              )}
            </CheckPermissions>
          );
        } else {
          return <></>;
        }
      },
    });
  },

  async registerTrads(app: any) {
    const { locales } = app;

    const importedTrads = await Promise.all(
      (locales as any[]).map((locale) => {
        return import(`./translations/${locale}.json`)
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};
