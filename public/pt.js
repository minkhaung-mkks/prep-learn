import https from "https";

// 1) Map from domain to { apiKey, robotId }
const domainMap = {
  "huurwoningen.nl": {
    apiKey: "0e8124f0-685f-4fa3-96e8-dc5292428a99:070d4af3-637b-42b6-9ca2-259e35cb5513",
    robotId: "f1b5bdde-123d-48a9-a576-2bf097f55b92",
  },
  "ikwilhuren.nu": {
    apiKey: "0e8124f0-685f-4fa3-96e8-dc5292428a99:070d4af3-637b-42b6-9ca2-259e35cb5513",
    robotId: "0442fab0-7861-4973-b44a-650adb5a121c",
  },
  "pararius.com": {
    apiKey: "f493bb2c-7320-4b56-ace5-1e0d6c9c78c4:13307079-d318-4b3e-b049-ff18e18c6de3",
    robotId: "72e7c56e-f0a5-453f-b8f4-a833f2274373",
  },
  "rentola.nl": {
    apiKey: "f493bb2c-7320-4b56-ace5-1e0d6c9c78c4:13307079-d318-4b3e-b049-ff18e18c6de3",
    robotId: "55fdbdc6-fd14-4736-88f1-7a22da03dae6",
  },
  "funda.nl": {
    apiKey: "f493bb2c-7320-4b56-ace5-1e0d6c9c78c4:13307079-d318-4b3e-b049-ff18e18c6de3",
    robotId: "321fb293-e726-4ff5-bdb0-82722d8e61fb",
  },
  "nmgwonen.nl": {
    apiKey: "f493bb2c-7320-4b56-ace5-1e0d6c9c78c4:13307079-d318-4b3e-b049-ff18e18c6de3",
    robotId: "7a5452f8-6d82-4527-ba04-805558199fc5",
  },
  "kamernet.nl": {
    apiKey: "f493bb2c-7320-4b56-ace5-1e0d6c9c78c4:13307079-d318-4b3e-b049-ff18e18c6de3",
    robotId: "a5551f31-4586-4714-b001-f923d12672ce",
  },
  "rebogroep.nl": {
    apiKey: "602324e8-93a8-4b3e-a710-d5607409b276:8c41eaed-e0be-48fe-90a2-89e989b2b8de",
    robotId: "2c5bb4df-10ea-47a9-ba17-23ed3d11a80f",
  },
  "expathousing.com": {
    apiKey: "b928967c-b110-4983-91f3-6255f9c0b6b7:cbdc6b0a-bda3-49fb-921f-17deef9a7dc3",
    robotId: "8a714b46-c7a6-4fc0-a04e-188f6aaf8b20",
  },
  "viadaan.nl": {
    apiKey: "5a80ed4d-ae66-4681-974d-0988764c22fb:8b0d82c5-84c4-4987-acf6-0d4dc75ab6c9",
    robotId: "743e1ae7-4d8b-4d29-86e6-5635d9900634",
  },
  "schepvastgoedmanagers.nl": {
    apiKey: "b443469c-fdfa-43ad-81e7-4c2d4ebb5215:8633a247-53ba-4fd1-929f-e39e60e4fb4a",
    robotId: "bd071983-367d-427c-a29b-eada5204764c",
  },
  "homeoforange.nl": {
    apiKey: "f729324d-f0d4-42c0-9d19-bc6930ccd0f8:057f96fd-191f-40a7-ad38-4836206153e8",
    robotId: "334eddcd-120e-4c60-8976-6416669a4823",
  },
  "hausing.com": {
    apiKey: "c9950a82-b0ad-4064-b2f4-5e5655a41e84:c9af80e5-7321-4b40-a610-a076485f0442",
    robotId: "c1e8d9dc-6742-4835-a9cb-750c0e6f2311",
  },
  "wonenbijbouwinvest.nl": {
    apiKey: "c9950a82-b0ad-4064-b2f4-5e5655a41e84:c9af80e5-7321-4b40-a610-a076485f0442",
    robotId: "1ff1dea8-7199-495d-adf7-bb386b0db28c",
  },
  "onlyexpats.nl": {
    apiKey: "1bb7cb3a-0e75-441c-914c-d19382e5167a:bd81ae4b-3bfd-4713-9c97-4520b7cdecb6",
    robotId: "5fab4ceb-8659-4d9b-a005-651ffc2ffeb2",
  },
  "huure.nl": {
    apiKey: "1bb7cb3a-0e75-441c-914c-d19382e5167a:bd81ae4b-3bfd-4713-9c97-4520b7cdecb6",
    robotId: "91123f54-f646-471a-976b-fe28930b5377",
  },
  "vbo.nl": {
    apiKey: "1bb7cb3a-0e75-441c-914c-d19382e5167a:bd81ae4b-3bfd-4713-9c97-4520b7cdecb6",
    robotId: "4950de6a-cd17-4c32-89a7-cf3ac0ad2a3b",
  },
  "woningnetregioamsterdam.nl": {
    apiKey: "1bb7cb3a-0e75-441c-914c-d19382e5167a:bd81ae4b-3bfd-4713-9c97-4520b7cdecb6",
    robotId: "2b1c1b90-fab3-4282-92da-8583218c69f4",
  },
  "jlgrealestate.com": {
    apiKey: "0b01e279-744a-4bc0-9b2b-e43a523c022a:79f63493-dbf4-44a3-98f9-69f8be40521c",
    robotId: "c942ac03-9f24-4f71-bd4b-625c9c05d44f",
  },
};

/**
 * Helper function to call Browse AI's API
 * @param {string} apiKey
 * @param {string} robotId
 * @param {string} originUrl
 * @returns {Promise<Object>} - The task creation response from Browse AI
 */
const triggerBrowseAITask = (apiKey, robotId, originUrl) => {
  const options = {
    method: "POST",
    hostname: "api.browse.ai",
    path: `/v2/robots/${robotId}/tasks`,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        try {
          const response = JSON.parse(data);
          console.log(`✅ Task Created for: ${originUrl}`);
          resolve(response);
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on("error", (error) => {
      console.error(`❌ Error for ${originUrl}:`, error);
      reject(error);
    });

    req.write(JSON.stringify({ inputParameters: { originUrl } }));
    req.end();
  });
};

/**
 * AWS Lambda handler
 * Expects a POST request body that is an array of objects,
 * each object having { "url": "...", "domain": "..." }.
 */
export const handler = async (event) => {
  try {
    // 2) Parse JSON body from event, expecting an array
    const body = JSON.parse(event.body || "[]");
    if (!Array.isArray(body)) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "Request body must be an array of {url, domain} objects.",
        }),
      };
    }

    // 3) Process each item in parallel
    const results = await Promise.all(
      body.map(async (item, index) => {
        const { url, domain } = item;
        if (!url || !domain) {
          throw new Error(
            `Item at index ${index} is missing 'url' or 'domain' property`
          );
        }

        // Lookup the API credentials
        const domainConfig = domainMap[domain];
        if (!domainConfig) {
          throw new Error(
            `No API configuration found for domain: ${domain} (item index ${index})`
          );
        }
        console.log(domainConfig)
        return {id: domainConfig.robotId, domain:domain, message: "runned"}
        // // Trigger the Browse AI task
        // const response = await triggerBrowseAITask(
        //   domainConfig.apiKey,
        //   domainConfig.robotId,
        //   url
        // );

        // // Return an object capturing the input and the response
        // return {
        //   index,
        //   url,
        //   domain,
        //   response,
        // };
      })
    );

    // 4) Return success with an array of results
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        success: true,
        results,
      }),
    };
  } catch (error) {
    console.error("❌ An error occurred:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
