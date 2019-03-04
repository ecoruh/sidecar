# sidecar
Node.js utility to encode 35 mm or 50 mm centered crop on *.dop files (aka sidecar files) of DxO PhotoLab RAW image processing utility. 

This utility has the ability to process multiple dop files in the current directory.


## Remarks
1. Requires [node.js 8.10.0](https://nodejs.org/download/release/v8.10.0/) installed.
1. All dop files should have Unix LF line ending.
1. This utility is idempotent, can be run multiple times without corrupting the files.  

## Usage

Open a Terminal window in the folder where you have dop files and run the following command:
```
node app [35|50|?]
```

* Command line option '?' is for printing usage information.
* Command line option '35' is for encoding dop files with 35 mm crop.
* Command line option '50' is for encoding dop files with 50 mm crop.
