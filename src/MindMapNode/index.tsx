import { useEffect, useLayoutEffect, useRef } from 'react'
import { Handle, NodeProps, Position } from 'reactflow'
import useStore from '../store'
import DragIcon from './DragIcon'

export type NodeData = {
  label: string
}

function MinaMapNode({ id, data }: NodeProps<NodeData>) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const updateNodeLabel = useStore((state) => state.updateNodeLabel)

  useLayoutEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.width = `${data.label.length * 8}px`
    }
  }, [data.label.length])

  useEffect(() => {
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus({ preventScroll: true })
      }
    }, 1)
  }, [])

  return (
    <>
      <div className="inputWrapper">
        <div className="dragHandle">
          <DragIcon />
        </div>
        <input
          // from now on we can use value instead of defaultValue
          // this makes sure that the input always shows the current label of the node
          value={data.label}
          onChange={(evt) => updateNodeLabel(id, evt.target.value)}
          className="input"
          ref={inputRef}
        />
      </div>

      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Top} />
    </>
  )
}

export default MinaMapNode
