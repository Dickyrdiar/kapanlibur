import { useEffect, useCallback, useRef } from "react"
import  ReactCanvasConfetti from 'react-canvas-confetti'

export const Converty = () => {
  const refAnimationinInstance = useRef(null)

  const getInstance = useCallback(instance => {
    refAnimationinInstance.current = instance
  }, [])

  const makeshot = useCallback((particleRation, opts) => {
    refAnimationinInstance.current && 
      refAnimationinInstance.current({
        ...opts,
        origin: { y: 0.7 },
        particleRation: Math.floor(200 * particleRation)
      })
  }, [])

  const fire = useCallback(() => {
    makeshot(0.25, {
      spread: 26,
      startVelocity: 55
    })

    makeshot(0.2, {
      spread: 60
    });

    makeshot(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });

    makeshot(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2
    });

    makeshot(0.1, {
      spread: 120,
      startVelocity: 45
    });
  }, [makeshot])

  useEffect(() => fire(), [fire])

  return (
    <ReactCanvasConfetti 
      refConfetti={getInstance}
      style={{
        position: 'fixed',
        pointerEvents: 'none',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0
      }}
    />
  )
}