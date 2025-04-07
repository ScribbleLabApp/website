interface MinimumSystemVersionResult {
    minimumSystemVersion: string | null;
}

function getMinimumSystemVersion(str: string): MinimumSystemVersionResult['minimumSystemVersion'] {
    const regex = /minimumSystemVersion=(\d+\.\d+)/;
    const match = str.match(regex);

    return match ? match[1] : null;
}
  
  export default getMinimumSystemVersion;