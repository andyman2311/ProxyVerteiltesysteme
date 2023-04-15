const assert = require('assert');
const request = require('supertest');
const axios = require('axios');


describe("check final text and delta", function () {
  this.timeout(10000);
  it("Try to request a not existing endpoint return status 404", async function () {
    const data = {
      task: "autocorrected-text",
      message: "Haloo, wirld!",
      languag: "DE"
    };
    try {
      const response = await axios.post("http://5.182.33.178:2223/falseEndpoint",data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Basic " + Buffer.from("andreas:1234567").toString("base64")
          }
        }
      );
    } catch (error) {
      assert.strictEqual(error.response.status, 404);
    }
  });
});


describe("try to reach a not existing endpoint", function () {
  this.timeout(10000);
  it("Try to request a not existing endpoint return status 404", async function () {
    const data = {
      task: "autocorrected-text",
      message: "Haloo, wirld!",
      languag: "DE"
    };
    try {
      const response = await axios.post("http://5.182.33.178:2223/falseEndpoint",data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Basic " + Buffer.from("andreas:1234567").toString("base64")
          }
        }
      );
    } catch (error) {
      assert.strictEqual(error.response.status, 404);
    }
  });
});


describe("check reachability of all endpoints", function () {
    this.timeout(10000);
    let endpoints=["translated-text","optimized-text","autocorrected-text","final-text"];
    it("Try to request all endpoints return status 200 for all", async function () {
        const data = {
            task:"autocorrected-text",
            message:"Haloo, wirld!",
            languag:"DE"
        };
        try {
            for (const endpoint of endpoints) {
                const response = await axios.post("http://5.182.33.178:2223/"+ endpoint, data, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Basic " + Buffer.from("andreas:1234567").toString("base64")
                    }
                });
                assert.strictEqual(response.status, 200);
            }
        } catch (error) {
            throw new Error(error);
        }
    });
});



describe("pass wrong data", function () {
    this.timeout(10000);
	let endpoints=["translated-text","optimized-text","autocorrected-text","final-text"];
	
	it("Try to request without wrong json data return htmlError Status 400", async function () {
	data = {
					task:"autocorrected-text",
					message:"Haloo, wirld!",
					langua:"DE"
				};
        try {
            const response = await axios.post("http://5.182.33.178:2223/autocorrected-text", data, {
                headers: {
                    "Content-Type": "application/json",
					 "Authorization": "Basic " + Buffer.from("andreas:1234567").toString("base64")
                },
				
            });
			assert.strictEqual(response.status, 200);
			assert.strictEqual(response.data.htmlError.status,400);
			
        } catch (error) {
            throw new Error(error);
        }
    });
});



describe("Try to post to all endpoints without credentials", function () {
    this.timeout(10000);
	let endpoints=["translated-text","optimized-text","autocorrected-text","final-text"];
	
	it("Try to request without correct auth return status 401", async function () {
        const data = {
            task:"autocorrected-text",
            message:"Haloo, wirld!",
            languag:"DE"
        };
        try {
            for (const endpoint of endpoints) {
                const response = await axios.post("http://5.182.33.178:2223/"+ endpoint, data, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Basic " + Buffer.from("false:false").toString("base64")
                    }
                });
            }
        } catch (error) {
			assert.strictEqual(error.response.status,401);
            //throw new Error(error);
        }
    });
});


describe("Translate a english text to german", function () {
    this.timeout(10000);
	
	it("Should successfully translate English to German", async function () {
	data = {
					task:"translated-text",
					message:"Hello, World!",
					targetLanguage:"DE"
				};
        try {
            const response = await axios.post("http://5.182.33.178:2223/translated-text", data, {
                headers: {
                    "Content-Type": "application/json",
					 "Authorization": "Basic " + Buffer.from("andreas:1234567").toString("base64")
                },
				
            });
            assert.strictEqual(response.status, 200);
			assert(response.headers['content-type'].includes('application/json'));
			assert.strictEqual(response.data.message, "Hallo, Welt!")
            
			
        } catch (error) {
            throw new Error(error);
        }
    });
});


describe("Translate a german text to enlish", function () {
    this.timeout(10000);
	
	it("Should successfully translate German to English", async function () {
	data = {
					task:"translated-text",
					message:"Hallo, Welt!",
					targetLanguage:"EN"
				};
        try {
            const response = await axios.post("http://5.182.33.178:2223/translated-text", data, {
                headers: {
                    "Content-Type": "application/json",
					 "Authorization": "Basic " + Buffer.from("andreas:1234567").toString("base64")
                },
				
            });
            assert.strictEqual(response.status, 200);
			assert(response.headers['content-type'].includes('application/json'));
			assert.strictEqual(response.data.message, "Hello, world!")
            
			
        } catch (error) {
            throw new Error(error);
        }
    });
});

describe("Autocorrect an english text", function () {
    this.timeout(10000);
	
	it("should fix spelling errors in english text", async function () {
	data = {
					task:"autocorrected-text",
					message:"Hello, wirld!",
					language:"EN"
				};
        try {
            const response = await axios.post("http://5.182.33.178:2223/autocorrected-text", data, {
                headers: {
                    "Content-Type": "application/json",
					 "Authorization": "Basic " + Buffer.from("andreas:1234567").toString("base64")
                },
				
            });
            assert.strictEqual(response.status, 200);
			assert(response.headers['content-type'].includes('application/json'));
			assert.strictEqual(response.data.message, "Hello, world!")
            
			
        } catch (error) {
            throw new Error(error);
        }
    });
});

describe("Autocorrect a german text", function () {
    this.timeout(10000);
	
	it("should fix spelling errors in german text", async function () {
	data = {
					task:"autocorrected-text",
					message:"Haloo, wirld!",
					language:"DE"
				};
        try {
            const response = await axios.post("http://5.182.33.178:2223/autocorrected-text", data, {
                headers: {
                    "Content-Type": "application/json",
					 "Authorization": "Basic " + Buffer.from("andreas:1234567").toString("base64")
                },
				
            });
            assert.strictEqual(response.status, 200);
			assert(response.headers['content-type'].includes('application/json'));
			assert.strictEqual(response.data.message, "Hallo, Welt!")
            
			
        } catch (error) {
            throw new Error(error);
        }
    });
});
