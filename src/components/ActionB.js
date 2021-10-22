import React from "react"
import {Link} from 'react-router-dom'
import {removeAction} from '../services/actionServices'
import { useGlobalState } from "../config/store"
import moment from 'moment'
import { PaperClipIcon } from '@heroicons/react/solid'

const ActionB = ({action, showControls, history}) => {
    const { store, dispatch } = useGlobalState()
    const {actionsData} = store


    // console.log(action)
    if(!action) return null

    // const linkStyles = {
    //     textDecoration: 'none',
    //     color: 'black' 
    // }
    // const buttonStyles = {
    //     margin: '.5em',
    //     fontSize: '1em'
    // }

    // const lineStyles = {
    //     whiteSpace: 'pre-line',
    // }



    function handleDelete(event) {
        event.preventDefault()
        removeAction(action._id)
        .then(() => {
            const updatedActions = actionsData.filter(
                (event) => event._id !== action._id
            );
            dispatch({
                type: 'setActions',
                data: updatedActions,
            });
            history.push('/');
        })
        .catch((error) => {
            console.log('Failed to delete action', error);
        })
}
    
    // Handle the edit button
    function handleEdit(event) {
        event.preventDefault()
        history.push(`/actions/edit/${action._id}`)
    }

    const {title, create_date, actions, files} = action

    return (
        <>

<div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900"><Link to={`/actions/${action._id}`}>Acción de la Semana</Link></h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">Semana 12 de Septiembre</p>
        {showControls && (<>
        <button className={"bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"} onClick={handleDelete}>Borrar</button>
        {` `}
        <button className={"bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"} onClick={handleEdit}>Editar</button></>)}
      </div>
      <div className="border-t border-gray-200">
      <>
        <dl>
           
          <Link to={`/actions/${action._id}`}>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Acción:</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{title}</dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Creación:</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{moment(create_date).format('MMMM Do, h:mm a')}</dd>
          </div>
          {/* <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Email address</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">margotfoster@example.com</dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Salary expectation</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">$120,000</dd>
          </div> */}
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <div className="text-sm font-medium text-gray-500">Descripción:</div>
            <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 whitespace-pre-wrap">
              {actions}
            </div>
          </div>
          </Link>
          {(files.length !== 0) && (<>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            
            <dt className="text-sm font-medium text-gray-500">Archivos:</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                {/* <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                  <div className="w-0 flex-1 flex items-center">
                    <PaperClipIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                    <span className="ml-2 flex-1 w-0 truncate">resume_back_end_developer.pdf</span>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <a href="/#" className="font-medium text-indigo-600 hover:text-indigo-500">
                      Download
                    </a>
                  </div>
                </li> */}
                {files.map((item,i) => 
                <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm" key={`${item}`}>
                  <div className="w-0 flex-1 flex items-center">
                    <PaperClipIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                    <span className="ml-2 flex-1 w-0 truncate">{item[0]}</span>
                  </div>
                  
                  <div className="ml-4 flex-shrink-0" >
                    <a href={`http://localhost:3009/actions/upload/${item[1]}`} target="_blank" rel="noreferrer" download className="font-medium text-indigo-600 hover:text-indigo-500">
                      Descargar
                    </a>
                  </div>
                </li>)}
              </ul>
            </dd>     
          </div>  
          </>)}

        </dl>
        </>
      </div>
    </div>

        {/* <div>
            <Link style={linkStyles} to={`/actions/${action._id}`}>
            <h1>{title}</h1>
            <p>{moment(create_date).format('MMMM Do, h:mm a')}</p>
            <p style={lineStyles}>{actions}</p>
            </Link>
            {showControls && (
            <>
                <ul>
                {files.map((item,i) => 
                <li key={`${item}`}>
                    <a href={`http://localhost:3009/actions/upload/${item}`} target="_blank" rel="noreferrer" download> 
                    Archivo adjunto {i+1}
                    </a>
                    </li>)}
                </ul>
            
            
                <div>
                    <button style={buttonStyles} onClick={handleDelete}>Delete</button>
                    <button style={buttonStyles} onClick={handleEdit}>Edit</button>
                </div>
            </>
            )}
        </div> */}
        </>
    )

}

export default ActionB