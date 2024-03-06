import logger from 'pino-http'

/**
	*	Wraps a logic endpoint into a functions that logs the req and res params.
	*
	* @param {Function} endpointLogic The endpoint logic to wrap into logging
	* @returns {Function} The logendpoint
	*/
export const logEndpoint = (endpointLogic) => {
	return (req, res) => {
		logger(req, res)
		endpointLogic(req, res)
	}
}
