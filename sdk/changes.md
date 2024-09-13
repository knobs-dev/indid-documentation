# Changes

## 0.2.0

### ⚠️ Breaking Changes

- SDK initialization has changed:

  from:

    ```ts
    const clientUser = await Client.init(
    rpcUrl: string,
    coreApiKey: string,
    opts?: IClientOpts
        );
    ```
  to:

    ```ts
    const clientUser = await Client.init(
    config: IClientConfig
        );
    ```

check the [init section](coreSdk.md#init) for more information.

### New features

- Added support for delegated transactions webhooks
- Removed the need for a provider if only delegated transactions are needed

### Improvements

- Improved the SDK initialization process
