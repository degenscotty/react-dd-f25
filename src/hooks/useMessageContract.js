import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { messageContractABI, CONTRACT_ADDRESS, CHAIN_ID } from "../contract/contractConfig"
import { useState, useEffect } from "react"

export function useMessageContract() {
    // State for managing the transaction
    const [isPending, setIsPending] = useState(false)

    // Read message from contract
    const {
        data: message,
        isLoading: isMessageLoading,
        refetch: refetchMessage,
    } = useReadContract({
        address: CONTRACT_ADDRESS,
        abi: messageContractABI,
        functionName: "getMessage",
        chainId: CHAIN_ID,
    })

    // Read count from contract
    const {
        data: countData,
        isLoading: isCountLoading,
        refetch: refetchCount,
    } = useReadContract({
        address: CONTRACT_ADDRESS,
        abi: messageContractABI,
        functionName: "getCount",
        chainId: CHAIN_ID,
    })

    // Get count as a number
    const count = countData ? Number(countData) : 0

    // Write to contract (update message)
    const { data: hash, isPending: isWritePending, writeContract } = useWriteContract()

    // Wait for transaction receipt
    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
        hash,
        chainId: CHAIN_ID,
    })

    // Determine overall loading state
    const isLoading =
        isMessageLoading || isCountLoading || isWritePending || isConfirming || isPending

    // Update message function
    const updateMessage = async (newMessage) => {
        if (!newMessage.trim()) return

        setIsPending(true)
        try {
            console.log("Attempting to write to contract with params:", {
                address: CONTRACT_ADDRESS,
                functionName: "updateMessage",
                args: [newMessage],
                chainId: CHAIN_ID,
            })

            await writeContract({
                address: CONTRACT_ADDRESS,
                abi: messageContractABI,
                functionName: "updateMessage",
                args: [newMessage],
                chainId: CHAIN_ID,
            })
            // Note: We don't need to manually update state here as we'll refetch after confirmation
        } catch (error) {
            console.error("Error updating message:", error)
            // Log more detailed error information
            if (error.code) {
                console.error(`Error code: ${error.code}`)
            }
            if (error.reason) {
                console.error(`Error reason: ${error.reason}`)
            }
            if (error.message) {
                console.error(`Error message: ${error.message}`)
            }
            setIsPending(false)
        }
    }

    // Refetch data when transaction is confirmed
    useEffect(() => {
        if (isConfirmed) {
            refetchMessage()
            refetchCount()
            setIsPending(false)
        }
    }, [isConfirmed, refetchMessage, refetchCount])

    return {
        message: message || "",
        count,
        isLoading,
        updateMessage,
        isPending: isPending || isWritePending || isConfirming,
        isConfirmed,
    }
}
