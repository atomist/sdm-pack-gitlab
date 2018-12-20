<p align="center">
  <img src="https://images.atomist.com/sdm/SDM-Logo-Dark.png">
</p>

# @atomist/sdm-pack-gitab

[![atomist sdm goals](http://badge.atomist.com/T29E48P34/atomist/sdm-pack-gitlab/ab056b07-b484-40a2-b656-44b8c4e9b327)](https://app.atomist.com/workspace/T29E48P34)
[![npm version](https://img.shields.io/npm/v/@atomist/sdm-pack-gitlab.svg)](https://www.npmjs.com/package/@atomist/sdm-pack-gitlab)

An Atomist extension pack for Gitlab.

[atomist-doc]: https://docs.atomist.com/ (Atomist Documentation)

## Purpose

This pack adds Gitlab support to an Atomist SDM. This includes:

- a credentials resolver to use a private access token

## Usage

Install the dependency in your SDM project.

```
$ npm install @atomist/sdm-pack-gitlab
```

In order to use the credentials resolver, add the following code to your SDM definition:

```typescript
sdm.configuration.sdm.credentialsResolver = new GitlabPrivateTokenCredentialsResolver();
```


## Support

General support questions should be discussed in the `#support`
channel in the [Atomist community Slack workspace][slack].

If you find a problem, please create an [issue][].

[issue]: https://github.com/atomist/sdm-pack-gitlab/issues

## Development

You will need to install [Node.js][node] to build and test this project.

[node]: https://nodejs.org/ (Node.js)

### Build and test

Install dependencies.

```
$ npm install
```

Use the `build` package script to compile, test, lint, and build the
documentation.

```
$ npm run build
```

### Release

Releases are handled via the [Atomist SDM][atomist-sdm].  Just press
the 'Approve' button in the Atomist dashboard or Slack.

[atomist-sdm]: https://github.com/atomist/atomist-sdm (Atomist Software Delivery Machine)

## Roadmap

- Add commands to create issues, tags, ...

Community contributions welcome!

---

Created by [Atomist][atomist].
Need Help?  [Join our Slack workspace][slack].

[atomist]: https://atomist.com/ (Atomist - How Teams Deliver Software)
[slack]: https://join.atomist.com/ (Atomist Community Slack)
