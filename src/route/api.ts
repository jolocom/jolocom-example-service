import { Router } from 'express'
import {
  authenticationController,
  authorizationController,
  credentialController,
  credentialOfferController,
  credentialOfferCustomController,
  credentialRequestController,
} from '../controller/api'

const apiRouter = Router()

apiRouter.post('/authentication', authenticationController.post)
apiRouter.post('/authorization', authorizationController.post)
apiRouter.post('/credential', credentialController.post)
apiRouter.post('/credential/request', credentialRequestController.post)
apiRouter.post('/credential/offer', credentialOfferController.post)
apiRouter.post('/credential/offer/custom', credentialOfferCustomController.post)

export default apiRouter
