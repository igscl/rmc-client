import React, { useEffect } from "react";
import { SpeakerphoneIcon } from '@heroicons/react/outline'

import { useGlobalState } from '../config/store'
import { usersCounter } from "../services/authServices";
import { nodesCounter } from "../services/nodeServices";

export default function Banner() {

  const { store, dispatch } = useGlobalState()
  const { loggedInUser, usersCount, nodesCount } = store
  console.log("banner count", usersCount.data)


  useEffect(() => {
    function fetchNumberOfUsers() {
      usersCounter().then((countData) => {
        dispatch({
          type: 'usersCount',
          data: countData
        })
      }).catch((error) => {
        console.log("An error occurred fetching users from the server:", error)
      })

    }

    function fetchNumberOfNodes() {
      nodesCounter().then((countData) => {
        console.log("countdata", countData)
        dispatch({
          type: 'nodesCount',
          data: countData
        })
      }).catch((error) => {
        console.log("An error occurred fetching nodes from the server:", error)
      })

    }
    loggedInUser && fetchNumberOfUsers()
    loggedInUser && fetchNumberOfNodes()

  }, [loggedInUser, dispatch])

  return (
    <div className="bg-indigo-600">
      <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between flex-wrap">
          <div className="w-0 flex-1 flex items-center">
            <span className="flex p-2 rounded-lg bg-indigo-800">
              <SpeakerphoneIcon className="h-6 w-6 text-white" aria-hidden="true" />
            </span>
            <p className="ml-3 font-medium text-white truncate">
              <span className="md:hidden">Somos {usersCount.data} corazones - en {nodesCount.data} nodos - en 5 continentes</span>
              <span className="hidden md:inline">Somos {usersCount.data} corazones - en {nodesCount.data} nodos - en 5 continentes</span>
            </p>
          </div>
          {/* <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
              <a
                href="/#"
                className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-indigo-50"
              >
                Learn more
              </a>
            </div> */}
          {/* <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
              <button
                type="button"
                className="-mr-1 flex p-2 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2"
              >
                <span className="sr-only">Dismiss</span>
                <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
              </button>
            </div> */}
        </div>
      </div>
    </div>
  )
}