# Creating Releases

**Note🗒️** The following steps require admin access to the GitHub repo.

## 1. Preparing local environment

- Ensure you have the latest `main` branch including all tags:

```
git checkout main && git pull
```

**Note** `git pull` should be used instead of `git pull origin main` to ensure that tags are pulled as well.

## 2. Updating `CHANGELOG.md`

- Go into every package that is being released. Edit `CHANGELOG.md` by moving any line items from `Unreleased` section into a new release with the new section with the new version number and today's date as title. (eg. `1.0.0 - 2019-07-24`).

- Stage the `CHANGELOG.md` changes using

```
git add .
```

**Note🗒️** lerna will make these staged changes part of the publish commit during the final confirmation of `yarn release`

## 3. Versioning and Tagging

- Begin the release process:

```
yarn release
```

- Follow the prompts to choose a version for each package. If you are releasing a new package, we encourage you to version it `1.0.0` to start with.

**Note🗒️** Packages adhere to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## 4. Pushing Changes

The following will push the changes and new tags to GitHub

```
git push origin main --follow-tags
```

## 5. Deploying to npm

- Log in to [Shipit](https://shipit.shopify.io/shopify/web-foundation/production)

- When CI is 🍏 on the commit titled `Publish`, press `Deploy` to update packages on npm.

# Releases for 🎩ing changes?

### Step 1 - Publish a `beta` release for testing

- In your branch, run `yarn run release-beta`. Lerna will launch it's CLI to select a version for the changed packages. Select the `Custom` option and enter a version with an appended `-beta.X` (eg. `0.29.10-my-feature-beta.1`). Many packages reference others. If your are prompted to version other packages, it is safe to do so.

  **Note:** Ensure your version includes the `-beta` text. This is how [shipit dictates](https://github.com/Shopify/shipit-engine/blob/master/lib/snippets/publish-lerna-independent-packages#L7-L12) a beta release.

- Push your branch to Github with the newly created tags using `git push origin <branch> --follow-tags`
- Create a temporary stack in Shipit that points to your deb branch. Set the Branch to your PR/feature branch and update the Environment to something specific to your feature (eg. test-cool-feature)
  ![Create Shipit Stack](../images/shipit-stack.png)

- Hit the deploy button on your Publish commit in Shipit to publish your beta release to npm

### Step 2 - Consume the release

- Add your release to a repository that uses the package your testing
  - `yarn add --dev @shopify/my-package@0.29.10-my-feature-beta.1`
