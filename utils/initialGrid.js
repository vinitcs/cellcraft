const cell = (value = '', cellFormat = null) => (
    {
        value,
        cellFormat:{
            fontSize:"text-xs",
            alignMent:"text-center"
        }
    }
)

export const initialGrid = Array.from({ length: 50 }, () => 
    Array.from({ length: 20 }, ()=>cell())
)
